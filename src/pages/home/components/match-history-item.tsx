import { Link } from "react-router-dom"
import type { RiotMatch } from "../types"
import { findPlayerParticipant } from "../utils/match.utils"
import { useTranslation } from "@/contexts/i18n"
import { formatDuration, formatGameTime } from "@/lib/format"
import { cn } from "@/lib/utils"

interface MatchHistoryItemProps {
  match: RiotMatch
  puuid: string
  region: string
}

export function MatchHistoryItem({ match, puuid, region }: MatchHistoryItemProps) {
  const { t } = useTranslation()
  const player = findPlayerParticipant(match, puuid)
  if (!player) return null

  const duration = formatDuration(match.info.gameDuration)
  const timeAgo = formatGameTime(match.info.gameCreation)
  const matchUrl = `/matches/${match.metadata.matchId}?region=${region}`

  return (
    <li>
      <Link
        to={matchUrl}
        className={cn(
          "block rounded-lg border p-3 text-sm transition-colors hover:bg-card-hover",
          player.win
            ? "border-victory-border bg-victory-bg"
            : "border-defeat-border bg-defeat-bg"
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-medium capitalize">{player.championName}</span>
          <span
            className={cn(
              "rounded px-1.5 py-0.5 text-xs font-medium",
              player.win
                ? "bg-victory-bg text-victory"
                : "bg-defeat-bg text-defeat"
            )}
          >
            {player.win ? t("match.result.victory") : t("match.result.defeat")}
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
