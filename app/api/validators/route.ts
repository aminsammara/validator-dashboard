import { NextResponse } from "next/server";
import type { Validator } from "@/lib/types";

export async function GET() {
  try {
    const response = await fetch(`${process.env.NODE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ method: "node_getValidatorsStats" }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch validators: ${response.status}`);
    }

    const parsed = await response.json();

    if (!parsed.result || !parsed.result.stats) {
      throw new Error("Invalid response format");
    }

    const result: Record<string, Validator> = {};
    const statsObj = parsed.result.stats;

    for (const [validatorAddress, data] of Object.entries<any>(statsObj)) {
      const historyArray = Array.isArray(data.history) ? data.history : [];

      let attestationCount = 0;
      let blocksMinedCount = 0;

      for (const entry of historyArray) {
        if (entry.status === "attestation-sent") attestationCount++;
        if (entry.status === "block-mined") blocksMinedCount++;
      }

      // Determine status based on data
      let status = "Active";
      if (data.missedProposals?.count > 10) status = "Jailed";
      if (data.slashes > 0) status = "Slashed";
      if (attestationCount === 0 && blocksMinedCount === 0)
        status = "Not Yet Participating";

      result[validatorAddress] = {
        address: validatorAddress,
        totalSlots: data.totalSlots || 0,
        missedProposals: {
          currentStreak: data.missedProposals?.currentStreak ?? 0,
          rate: data.missedProposals?.rate ?? null,
          count: data.missedProposals?.count ?? 0,
        },
        missedAttestations: {
          currentStreak: data.missedAttestations?.currentStreak ?? 0,
          rate: data.missedAttestations?.rate ?? null,
          count: data.missedAttestations?.count ?? 0,
        },
        history: Array.isArray(data.history)
          ? data.history.map((entry: any) => ({
              slot: entry.slot,
              status: entry.status,
            }))
          : [],
        attestationCount: attestationCount,
        blocksMinedCount: blocksMinedCount,
      };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching validators:", error);
    return NextResponse.json(
      { error: "Failed to fetch validators" },
      { status: 500 }
    );
  }
}
