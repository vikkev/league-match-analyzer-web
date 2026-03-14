import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import type { RiotRegion } from "./types"
import { getMatchDetail } from "./services/match.service"
import { MatchDetail } from "./components/MatchDetail"

const DEFAULT_REGION: RiotRegion = "americas"

export function PartidasPage() {
  const { id: matchId } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const region = (searchParams.get("region") as RiotRegion) || DEFAULT_REGION

  const [match, setMatch] = useState<Awaited<ReturnType<typeof getMatchDetail>> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!matchId) {
      setLoading(false)
      setError("ID da partida não informado.")
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    getMatchDetail(matchId, region)
      .then((data) => {
        if (!cancelled) setMatch(data)
      })
      .catch((err) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Erro ao carregar partida")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [matchId, region])

  if (loading) {
    return (
      <div className="flex flex-col p-6">
        <p className="text-sm text-muted-foreground">Carregando partida…</p>
      </div>
    )
  }

  if (error || !match) {
    return (
      <div className="flex flex-col gap-4 p-6">
        <div
          className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {error ?? "Partida não encontrada."}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <MatchDetail match={match} />
    </div>
  )
}
