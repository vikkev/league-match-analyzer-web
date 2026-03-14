import type { MatchParticipant, RiotMatch } from "../types"

/** Encontra o participante do jogador (por puuid) na partida. */
export function findPlayerParticipant(
  match: RiotMatch,
  puuid: string
): MatchParticipant | undefined {
  return match.info.participants.find((p) => p.puuid === puuid)
}

export { formatDuration, formatGameTime } from "@/lib/format"
