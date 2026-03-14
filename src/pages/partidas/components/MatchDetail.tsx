import type { RiotMatch } from "../types"
import { MatchDetailHeader } from "./MatchDetailHeader"
import { ParticipantCard } from "./ParticipantCard"

interface MatchDetailProps {
  match: RiotMatch
}

export function MatchDetail({ match }: MatchDetailProps) {
  const { info, metadata } = match

  return (
    <div className="flex flex-col gap-4">
      <MatchDetailHeader
        matchId={metadata.matchId}
        gameMode={info.gameMode}
        gameDuration={info.gameDuration}
        gameCreation={info.gameCreation}
      />
      <div className="rounded-lg border border-border bg-muted/20 p-4">
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Participantes
        </h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {info.participants.map((p) => (
            <ParticipantCard key={p.puuid} participant={p} />
          ))}
        </ul>
      </div>
    </div>
  )
}
