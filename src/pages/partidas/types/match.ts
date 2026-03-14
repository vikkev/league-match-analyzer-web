/** Participante em uma partida (match-v5) */
export interface MatchParticipant {
  puuid: string
  championName: string
  kills: number
  deaths: number
  assists: number
  win: boolean
  totalMinionsKilled: number
  neutralMinionsKilled: number
}

/** Detalhe da partida (match-v5) */
export interface RiotMatch {
  metadata: { matchId: string }
  info: {
    gameCreation: number
    gameDuration: number
    gameMode: string
    participants: MatchParticipant[]
  }
}
