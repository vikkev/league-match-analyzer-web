import { useEffect, useState } from "react"
import { useTranslation } from "@/contexts/i18n"
import type { RiotMatch } from "../types"
import { getMatchHistory } from "../services/match.service"
import { MatchHistoryItem } from "./match-history-item"
import { MatchHistoryLoading } from "./match-history-loading"
import { MatchHistoryError } from "./match-history-error"
import { MatchHistoryEmpty } from "./match-history-empty"

interface MatchHistoryProps {
  puuid: string
  region: "americas" | "europe" | "asia"
}

export function MatchHistory({ puuid, region }: MatchHistoryProps) {
  const { t } = useTranslation()
  const [matches, setMatches] = useState<RiotMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    getMatchHistory(puuid, region, 10)
      .then((data) => {
        if (!cancelled) setMatches(data)
      })
      .catch((err) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : t("matchHistory.error"))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
      setLoading(true)
      setError(null)
    }
  }, [puuid, region, t])

  if (loading) return <MatchHistoryLoading />
  if (error) return <MatchHistoryError message={error} />
  if (matches.length === 0) return <MatchHistoryEmpty />

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-foreground">{t("matchHistory.title")}</h3>
      <ul className="flex flex-col gap-2">
        {matches.map((match) => (
          <MatchHistoryItem
            key={match.metadata.matchId}
            match={match}
            puuid={puuid}
            region={region}
          />
        ))}
      </ul>
    </div>
  )
}
