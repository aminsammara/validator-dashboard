export interface Validator {
  address: string
  totalSlots: number
  missedProposals: {
    currentStreak: number
    rate: number | null
    count: number
  }
  missedAttestations: {
    currentStreak: number
    rate: number | null
    count: number
  }
  history: Array<{
    slot: number
    status: string
  }>
  attestationCount: number
  blocksMinedCount: number
}
