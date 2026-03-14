import { Link } from "react-router-dom"
import type { RiotMatch } from "../types"
import { findPlayerParticipant } from "../utils/match.utils"
import { formatDuration, formatGameTime } from "@/lib/format"
import { cn } from "@/lib/utils"

interface MatchHistoryItemProps {
  match: RiotMatch
  puuid: string
  region: string
}

export function MatchHistoryItem({ match, puuid, region }: MatchHistoryItemProps) {
  const player = findPlayerParticipant(match, puuid)
  if (!player) return null

  const duration = formatDuration(match.info.gameDuration)
  const timeAgo = formatGameTime(match.info.gameCreation)
  const matchUrl = `/partidas/${match.metadata.matchId}?region=${region}`

  return (
    <li>
      <Link
        to={matchUrl}
        className={cn(
          "block rounded-lg border p-3 text-sm transition-colors hover:opacity-90",
          player.win
            ? "border-green-500/30 bg-green-500/5 dark:border-green-400/20 dark:bg-green-400/5"
            : "border-red-500/30 bg-red-500/5 dark:border-red-400/20 dark:bg-red-400/5"
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-medium capitalize">{player.championName}</span>
          <span
            className={cn(
              "rounded px-1.5 py-0.5 text-xs font-medium",
              player.win
                ? "bg-green-500/20 text-green-700 dark:text-green-300"
                : "bg-red-500/20 text-red-700 dark:text-red-300"
            )}
          >
            {player.win ? "Vitória" : "Derrota"}
          </span>
        </div>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0 text-muted-foreground">
          <span>
            {player.kills}/{player.deaths}/{player.assists} KDA
          </span>
          <span>{duration}</span>
          <span>{timeAgo}</span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {match.info.gameMode}
        </p>
      </Link>
    </li>
  )
}
