import type { RiotRegion } from "../types"

/** Opções de região para o select da home */
export const REGIONS: { value: RiotRegion; label: string }[] = [
  { value: "americas", label: "Américas" },
  { value: "europe", label: "Europa" },
  { value: "asia", label: "Ásia" },
]

/**
 * Separa "gameName#tagLine" em { gameName, tagLine }.
 * Se não houver #, tagLine padrão é vazio.
 */
export function parseRiotId(input: string): { gameName: string; tagLine: string } {
  const trimmed = input.trim()
  const hashIndex = trimmed.indexOf("#")
  if (hashIndex === -1) {
    return { gameName: trimmed, tagLine: "" }
  }
  return {
    gameName: trimmed.slice(0, hashIndex).trim(),
    tagLine: trimmed.slice(hashIndex + 1).trim(),
  }
}
