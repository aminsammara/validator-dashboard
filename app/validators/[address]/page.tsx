// import { fetchValidators } from "@/lib/validators";
// import { getInfo } from "@/lib/chain";
// import { notFound } from "next/navigation";

// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Activity, Box, CheckCircle, Clock, XCircle } from "lucide-react";

// import { cn } from "@/lib/utils";

// const STATUS_COLORS: Record<string, string> = {
//   Active: "bg-purple-500 text-white",
//   Jailed: "bg-amber-500 text-white",
//   Slashed: "bg-red-600 text-white",
//   "Not Yet Participating": "bg-slate-400 text-white",
// };

// const VALIDATOR_STATUS_MAP: Record<string, string> = {
//   "0": "The validator is not in the validator set",
//   "1": "The validator is currently in the validator set",
//   "2": "The validator is not active in the set. This could mean that they initiated a withdrawal and are awaiting final exit",
//   "3": "The validator has completed their exit delay and can be exited from the validator set",
// };

// type Props = {
//   params: {
//     address: string;
//   };
// };

// export default async function ValidatorPage({ params }: Props) {
//   const { address } = params;

//   const validators = await fetchValidators();
//   const validator = validators[address.toLowerCase()];

//   if (!validator) {
//     return notFound();
//   }

//   const chainInfo = await getInfo(address);
//   const statusColor =
//     STATUS_COLORS[validator.status] || "bg-slate-200 text-black";
//   const statusDescription =
//     VALIDATOR_STATUS_MAP[chainInfo[3].toString()] ||
//     `Unknown status: ${chainInfo[3]}`;

//   return (
//     <div className="p-6 max-w-5xl mx-auto space-y-8 bg-[#0F0B1A] text-white">
//       <div className="bg-gradient-to-br from-[#6E56CF] to-[#9B6DFF] rounded-2xl p-8 shadow-lg relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10 bg-[url('/placeholder.svg?height=400&width=400')] bg-repeat"></div>
//         <div className="relative z-10">
//           <h1 className="text-3xl font-bold text-white mb-2">
//             Validator Details
//           </h1>
//           <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
//             <div className="flex-1">
//               <p className="text-white/80 text-sm mb-1">Address</p>
//               <p className="text-white font-mono text-sm sm:text-base break-all">
//                 {address}
//               </p>
//             </div>
//             <Badge className={cn("text-sm px-3 py-1 h-auto", statusColor)}>
//               {validator.status}
//             </Badge>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card className="overflow-hidden border-none shadow-md bg-[#1A1528] text-white">
//           <CardHeader className="bg-[#231C34] pb-3 border-b border-[#382C50]">
//             <div className="flex items-center gap-2">
//               <Activity className="h-5 w-5 text-purple-400" />
//               <CardTitle className="text-lg">Validator Stats</CardTitle>
//             </div>
//           </CardHeader>
//           <CardContent className="pt-6">
//             <dl className="grid grid-cols-2 gap-4">
//               <div>
//                 <dt className="text-sm font-medium text-purple-300">
//                   Blocks Mined
//                 </dt>
//                 <dd className="mt-1 text-lg font-semibold">
//                   {validator.blocksMinedCount}
//                 </dd>
//               </div>
//               <div>
//                 <dt className="text-sm font-medium text-purple-300">
//                   Attestations
//                 </dt>
//                 <dd className="mt-1 text-lg font-semibold">
//                   {validator.attestationCount}
//                 </dd>
//               </div>
//               <div>
//                 <dt className="text-sm font-medium text-purple-300">
//                   Missed Proposals
//                 </dt>
//                 <dd className="mt-1 text-lg font-semibold">
//                   {validator.missedProposals.count}
//                 </dd>
//               </div>
//               <div>
//                 <dt className="text-sm font-medium text-purple-300">
//                   Missed Attestations
//                 </dt>
//                 <dd className="mt-1 text-lg font-semibold">
//                   {validator.missedAttestations.count}
//                 </dd>
//               </div>
//             </dl>
//           </CardContent>
//         </Card>

//         <Card className="overflow-hidden border-none shadow-md bg-[#1A1528] text-white">
//           <CardHeader className="bg-[#231C34] pb-3 border-b border-[#382C50]">
//             <div className="flex items-center gap-2">
//               <Box className="h-5 w-5 text-purple-400" />
//               <CardTitle className="text-lg">On-Chain Info</CardTitle>
//             </div>
//           </CardHeader>
//           <CardContent className="pt-6">
//             <dl className="space-y-3">
//               <div>
//                 <dt className="text-sm font-medium text-purple-300">
//                   Staked Amount
//                 </dt>
//                 <dd className="mt-1 font-mono">{chainInfo[0].toString()}</dd>
//               </div>
//               <div>
//                 <dt className="text-sm font-medium text-purple-300">
//                   Withdrawer Address
//                 </dt>
//                 <dd className="mt-1 font-mono text-sm truncate">
//                   {chainInfo[1]}
//                 </dd>
//               </div>
//               <div>
//                 <dt className="text-sm font-medium text-purple-300">
//                   Attester Address
//                 </dt>
//                 <dd className="mt-1 font-mono text-sm truncate">
//                   {chainInfo[2]}
//                 </dd>
//               </div>
//               <div>
//                 <dt className="text-sm font-medium text-purple-300">Status</dt>
//                 <dd className="mt-1">{statusDescription}</dd>
//               </div>
//             </dl>
//           </CardContent>
//         </Card>
//       </div>

//       <Card className="overflow-hidden border-none shadow-md bg-[#1A1528] text-white">
//         <CardHeader className="bg-[#231C34] pb-3 border-b border-[#382C50]">
//           <div className="flex items-center gap-2">
//             <Clock className="h-5 w-5 text-purple-400" />
//             <CardTitle className="text-lg">Slot History</CardTitle>
//           </div>
//         </CardHeader>
//         <CardContent className="pt-6">
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="border-b border-[#382C50]">
//                   <th className="py-3 px-4 text-left font-medium text-purple-300">
//                     Slot
//                   </th>
//                   <th className="py-3 px-4 text-left font-medium text-purple-300">
//                     Status
//                   </th>
//                   <th className="py-3 px-4 text-left font-medium text-purple-300">
//                     Indicator
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {validator.history.map((entry, idx) => (
//                   <tr
//                     key={idx}
//                     className="border-b border-[#382C50]/50 hover:bg-[#231C34] transition-colors"
//                   >
//                     <td className="py-3 px-4 font-mono">{entry.slot}</td>
//                     <td className="py-3 px-4">{entry.status}</td>
//                     <td className="py-3 px-4">
//                       {entry.status === "attestation-sent" ||
//                       entry.status === "block-mined" ? (
//                         <CheckCircle className="h-4 w-4 text-emerald-500" />
//                       ) : (
//                         <XCircle className="h-4 w-4 text-red-500" />
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { fetchValidators } from "@/lib/validators";
import { getInfo } from "@/lib/chain";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Box, CheckCircle, Clock, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-purple-500 text-white",
  Jailed: "bg-amber-500 text-white",
  Slashed: "bg-red-600 text-white",
  "Not Yet Participating": "bg-slate-400 text-white",
};

const VALIDATOR_STATUS_MAP: Record<string, string> = {
  "0": "The validator is not in the validator set",
  "1": "The validator is currently in the validator set",
  "2": "The validator is not active in the set. This could mean that they initiated a withdrawal and are awaiting final exit",
  "3": "The validator has completed their exit delay and can be exited from the validator set",
};

type Props = {
  params: {
    address: string;
  };
};

export default async function ValidatorPage({ params }: Props) {
  const { address } = params;

  const validators = await fetchValidators();
  const validator = validators[address.toLowerCase()];

  if (!validator) {
    return notFound();
  }

  const chainInfo = await getInfo(address);
  const statusColor =
    STATUS_COLORS[validator.status] || "bg-slate-200 text-black";
  const statusDescription =
    VALIDATOR_STATUS_MAP[chainInfo[3].toString()] ||
    `Unknown status: ${chainInfo[3]}`;

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/images/aztec-pattern.png")' }}
    >
      <div className="min-h-screen w-full backdrop-blur-sm backdrop-brightness-50 py-8">
        <div className="p-6 max-w-5xl mx-auto space-y-8">
          <div className="bg-gradient-to-br from-[#6E56CF] to-[#9B6DFF] rounded-2xl p-8 shadow-lg relative overflow-hidden backdrop-blur-sm bg-opacity-90">
            <div className="absolute inset-0 opacity-10 bg-[url('/placeholder.svg?height=400&width=400')] bg-repeat"></div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold text-white mb-2">
                Validator Details
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
                <div className="flex-1">
                  <p className="text-white/80 text-sm mb-1">Address</p>
                  <p className="text-white font-mono text-sm sm:text-base break-all">
                    {address}
                  </p>
                </div>
                <Badge className={cn("text-sm px-3 py-1 h-auto", statusColor)}>
                  {validator.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="overflow-hidden border-none shadow-md bg-[#1A1528]/90 text-white backdrop-blur-sm">
              <CardHeader className="bg-[#231C34] pb-3 border-b border-[#382C50]">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-400" />
                  <CardTitle className="text-lg">Validator Stats</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-purple-300">
                      Blocks Mined
                    </dt>
                    <dd className="mt-1 text-lg font-semibold">
                      {validator.blocksMinedCount}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-purple-300">
                      Attestations
                    </dt>
                    <dd className="mt-1 text-lg font-semibold">
                      {validator.attestationCount}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-purple-300">
                      Missed Proposals
                    </dt>
                    <dd className="mt-1 text-lg font-semibold">
                      {validator.missedProposals.count}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-purple-300">
                      Missed Attestations
                    </dt>
                    <dd className="mt-1 text-lg font-semibold">
                      {validator.missedAttestations.count}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md bg-[#1A1528]/90 text-white backdrop-blur-sm">
              <CardHeader className="bg-[#231C34] pb-3 border-b border-[#382C50]">
                <div className="flex items-center gap-2">
                  <Box className="h-5 w-5 text-purple-400" />
                  <CardTitle className="text-lg">On-Chain Info</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-purple-300">
                      Staked Amount
                    </dt>
                    <dd className="mt-1 font-mono">
                      {chainInfo[0].toString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-purple-300">
                      Withdrawer Address
                    </dt>
                    <dd className="mt-1 font-mono text-sm truncate">
                      {chainInfo[1]}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-purple-300">
                      Attester Address
                    </dt>
                    <dd className="mt-1 font-mono text-sm truncate">
                      {chainInfo[2]}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-purple-300">
                      Status
                    </dt>
                    <dd className="mt-1">{statusDescription}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden border-none shadow-md bg-[#1A1528]/90 text-white backdrop-blur-sm">
            <CardHeader className="bg-[#231C34] pb-3 border-b border-[#382C50]">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-400" />
                <CardTitle className="text-lg">Slot History</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#382C50]">
                      <th className="py-3 px-4 text-left font-medium text-purple-300">
                        Slot
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-purple-300">
                        Status
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-purple-300">
                        Indicator
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {validator.history.map((entry, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-[#382C50]/50 hover:bg-[#231C34] transition-colors"
                      >
                        <td className="py-3 px-4 font-mono">{entry.slot}</td>
                        <td className="py-3 px-4">{entry.status}</td>
                        <td className="py-3 px-4">
                          {entry.status === "attestation-sent" ||
                          entry.status === "block-mined" ? (
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
