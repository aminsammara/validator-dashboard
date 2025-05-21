// lib/chain.ts
import { parseAbi, createPublicClient, http, getContract } from "viem";
import { sepolia } from "viem/chains";

const client = createPublicClient({
  chain: sepolia,
  transport: http(
    "https://eth-sepolia.g.alchemy.com/v2/IPiyGKCHOdUgbPLeoXQR3nzs1G1bfzRe"
  ),
});

const getInfoAbi = parseAbi([
  "function getInfo(address) view returns (uint256, address, address, uint8)",
]);

const contractAddress = "0x8D1cc702453fa889f137DBD5734CDb7Ee96B6Ba0"; // Replace

export async function getInfo(address: string) {
  return await client.readContract({
    address: contractAddress,
    abi: getInfoAbi,
    functionName: "getInfo",
    args: [address],
  });
}
