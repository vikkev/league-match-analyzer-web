"use client"

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react"
import type { RiotAccount, RiotRegion } from "@/pages/home/types"
import { getPlayer } from "@/pages/home/services/player.service"

type PlayerSearchState = {
  gameName: string
  setGameName: (v: string) => void
  tagLine: string
  setTagLine: (v: string) => void
  region: RiotRegion
  setRegion: (v: RiotRegion) => void
  player: RiotAccount | null
  error: string | null
  loading: boolean
  search: (e: React.FormEvent) => Promise<void>
}

const PlayerSearchContext = createContext<PlayerSearchState | null>(null)

export function PlayerSearchProvider({ children }: { children: ReactNode }) {
  const [gameName, setGameName] = useState("")
  const [tagLine, setTagLine] = useState("")
  const [region, setRegion] = useState<RiotRegion>("americas")
  const [player, setPlayer] = useState<RiotAccount | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const search = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setPlayer(null)

    const name = gameName.trim()
    const tag = tagLine.trim()
    if (!name) {
      setError("Digite o nome do jogador")
      return
    }
    if (!tag) {
      setError("Digite a tag do jogador (ex: BR1)")
      return
    }

    setLoading(true)
    try {
      const data = await getPlayer(name, tag, region)
      setPlayer(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar jogador")
    } finally {
      setLoading(false)
    }
  }, [gameName, tagLine, region])

  const value: PlayerSearchState = {
    gameName,
    setGameName,
    tagLine,
    setTagLine,
    region,
    setRegion,
    player,
    error,
    loading,
    search,
  }

  return (
    <PlayerSearchContext.Provider value={value}>
      {children}
    </PlayerSearchContext.Provider>
  )
}

export function usePlayerSearch(): PlayerSearchState {
  const ctx = useContext(PlayerSearchContext)
  if (!ctx) {
    throw new Error("usePlayerSearch must be used within PlayerSearchProvider")
  }
  return ctx
}
