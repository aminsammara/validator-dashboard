"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  Search,
  ChevronRight,
} from "lucide-react";
import type { Validator } from "@/lib/types";
import Link from "next/link";

type ValidatorTableProps = {
  validators: Record<string, Validator>;
};

type SortField =
  | "address"
  | "attestationCount"
  | "missedAttestations.count"
  | "blocksMinedCount"
  | "missedProposals.count";

type SortDirection = "asc" | "desc";

const STATUS_COLORS = {
  active: "bg-emerald-500 text-white hover:bg-emerald-600",
  warning: "bg-amber-500 text-black hover:bg-amber-600",
  notParticipating: "bg-slate-400 text-white hover:bg-slate-500",
  jailed: "bg-red-600 text-white hover:bg-red-700",
};

export function ValidatorTable({ validators }: ValidatorTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("address");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getStatusBadge = (validator: Validator) => {
    if (validator.missedProposals.count > 10) {
      return (
        <Badge className={`flex items-center gap-1 ${STATUS_COLORS.jailed}`}>
          <XCircle className="h-3 w-3" /> Jailed
        </Badge>
      );
    }

    if (validator.attestationCount === 0 && validator.blocksMinedCount === 0) {
      return (
        <Badge
          className={`flex items-center gap-1 ${STATUS_COLORS.notParticipating}`}
        >
          <Clock className="h-3 w-3" /> Not Participating
        </Badge>
      );
    }

    const missedAttestationRate = validator.missedAttestations.rate || 0;
    const missedProposalRate = validator.missedProposals.rate || 0;

    if (missedAttestationRate > 0.1 || missedProposalRate > 0.1) {
      return (
        <Badge className={`flex items-center gap-1 ${STATUS_COLORS.warning}`}>
          <AlertCircle className="h-3 w-3" /> Warning
        </Badge>
      );
    }

    return (
      <Badge className={`flex items-center gap-1 ${STATUS_COLORS.active}`}>
        <CheckCircle2 className="h-3 w-3" /> Active
      </Badge>
    );
  };

  const sortedValidators = Object.values(validators).sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortField) {
      case "address":
        aValue = a.address;
        bValue = b.address;
        break;
      case "attestationCount":
        aValue = a.attestationCount;
        bValue = b.attestationCount;
        break;
      case "missedAttestations.count":
        aValue = a.missedAttestations.count;
        bValue = b.missedAttestations.count;
        break;
      case "blocksMinedCount":
        aValue = a.blocksMinedCount;
        bValue = b.blocksMinedCount;
        break;
      case "missedProposals.count":
        aValue = a.missedProposals.count;
        bValue = b.missedProposals.count;
        break;
      default:
        aValue = a.address;
        bValue = b.address;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
  });

  const filteredValidators = sortedValidators.filter((validator) =>
    validator.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2 w-full max-w-sm">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-purple-500" />
            </div>
            <Input
              placeholder="Search by validator address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 border-purple-100 focus-visible:ring-purple-500 focus-visible:border-purple-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 hover:border-purple-300"
              >
                Sort by
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white border-purple-100"
            >
              <DropdownMenuItem
                onClick={() => handleSort("address")}
                className="hover:bg-purple-50 focus:bg-purple-50"
              >
                Address
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSort("attestationCount")}
                className="hover:bg-purple-50 focus:bg-purple-50"
              >
                Attestations
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSort("missedAttestations.count")}
                className="hover:bg-purple-50 focus:bg-purple-50"
              >
                Missed Attestations
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSort("blocksMinedCount")}
                className="hover:bg-purple-50 focus:bg-purple-50"
              >
                Block Proposals
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSort("missedProposals.count")}
                className="hover:bg-purple-50 focus:bg-purple-50"
              >
                Missed Proposals
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-purple-100 shadow-sm">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-purple-50 to-purple-100 hover:bg-purple-100">
                <TableHead className="w-[300px] text-purple-800 font-semibold">
                  Validator Address
                </TableHead>
                <TableHead className="text-center text-purple-800 font-semibold">
                  Status
                </TableHead>
                <TableHead className="text-center text-purple-800 font-semibold">
                  <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => handleSort("attestationCount")}
                  >
                    Attestations
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-center text-purple-800 font-semibold">
                  <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => handleSort("missedAttestations.count")}
                  >
                    Missed Attestations
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-center text-purple-800 font-semibold">
                  <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => handleSort("blocksMinedCount")}
                  >
                    Block Proposals
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-center text-purple-800 font-semibold">
                  <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => handleSort("missedProposals.count")}
                  >
                    Missed Proposals
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredValidators.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-gray-500"
                  >
                    No validators found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredValidators.map((validator, index) => (
                  <TableRow
                    key={validator.address}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-purple-50"
                    } hover:bg-purple-100/50 transition-colors`}
                  >
                    <TableCell className="font-mono text-xs">
                      <Link
                        href={`/validators/${validator.address}`}
                        className="text-purple-700 hover:text-purple-900 flex items-center group"
                      >
                        {validator.address}
                        <ChevronRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-purple-500" />
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(validator)}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-gray-800">
                      {validator.attestationCount}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-gray-800">
                      {validator.missedAttestations.count}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-gray-800">
                      {validator.blocksMinedCount}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-gray-800">
                      {validator.missedProposals.count}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="text-sm text-purple-700 mt-2">
        Showing {filteredValidators.length} of {Object.keys(validators).length}{" "}
        validators
      </div>
    </div>
  );
}
