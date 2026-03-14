import type { MatchParticipant } from "../types"
import { cn } from "@/lib/utils"

interface ParticipantCardProps {
  participant: MatchParticipant
}

export function ParticipantCard({ participant }: ParticipantCardProps) {
  const { championName, win, kills, deaths, assists, totalMinionsKilled, neutralMinionsKilled } =
    participant
  const cs = totalMinionsKilled + neutralMinionsKilled

  return (
    <li
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm",
        win
          ? "border-green-500/30 bg-green-500/5 dark:border-green-400/20 dark:bg-green-400/5"
          : "border-red-500/30 bg-red-500/5 dark:border-red-400/20 dark:bg-red-400/5"
      )}
    >
      <span className="font-medium capitalize">{championName}</span>
      <span
        className={cn(
          "rounded px-1.5 py-0.5 text-xs font-medium",
          win
            ? "bg-green-500/20 text-green-700 dark:text-green-300"
            : "bg-red-500/20 text-red-700 dark:text-red-300"
        )}
      >
        {win ? "Vitória" : "Derrota"}
      </span>
      <span className="w-full text-muted-foreground">
        {kills}/{deaths}/{assists} KDA
        {cs > 0 && ` · ${cs} CS`}
      </span>
    </li>
  )
}
