import type { MatchParticipant } from "../types"
import { useTranslation } from "@/contexts/i18n"
import { cn } from "@/lib/utils"

interface ParticipantCardProps {
  participant: MatchParticipant
}

export function ParticipantCard({ participant }: ParticipantCardProps) {
  const { t } = useTranslation()
  const { championName, win, kills, deaths, assists, totalMinionsKilled, neutralMinionsKilled } =
    participant
  const cs = totalMinionsKilled + neutralMinionsKilled

  return (
    <li
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm",
        win
          ? "border-victory-border bg-victory-bg"
          : "border-defeat-border bg-defeat-bg"
      )}
    >
      <span className="font-medium capitalize">{championName}</span>
      <span
        className={cn(
          "rounded px-1.5 py-0.5 text-xs font-medium",
          win
            ? "bg-victory-bg text-victory"
            : "bg-defeat-bg text-defeat"
        )}
      >
        {win ? t("match.result.victory") : t("match.result.defeat")}
      </span>
      <span className="w-full text-muted-foreground">
        {kills}/{deaths}/{assists} KDA
        {cs > 0 && ` · ${cs} CS`}
      </span>
    </li>
  )
}
