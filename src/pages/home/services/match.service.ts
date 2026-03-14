import { riotFetch } from "@/lib/riot"
import type { RiotMatch, RiotRegion } from "../types"

const PATH_MATCH_IDS = "/lol/match/v5/matches/by-puuid"
const PATH_MATCH = "/lol/match/v5/matches"
const DEFAULT_MATCH_COUNT = 10

/**
 * Lists the player's latest match IDs.
 * Match v5: GET /lol/match/v5/matches/by-puuid/{puuid}/ids
 */
export async function getMatchIds(
  puuid: string,
  region: RiotRegion,
  count = DEFAULT_MATCH_COUNT
): Promise<string[]> {
  const path = `${PATH_MATCH_IDS}/${encodeURIComponent(puuid)}/ids`
  return riotFetch<string[]>(region, path, { count: String(count) })
}

/**
 * Fetches a single match by ID.
 * Match v5: GET /lol/match/v5/matches/{matchId}
 */
export async function getMatchDetail(
  matchId: string,
  region: RiotRegion
): Promise<RiotMatch> {
  const path = `${PATH_MATCH}/${encodeURIComponent(matchId)}`
  return riotFetch<RiotMatch>(region, path)
}

/**
 * Fetches latest matches with full details (IDs + each match detail).
 */
export async function getMatchHistory(
  puuid: string,
  region: RiotRegion,
  count = DEFAULT_MATCH_COUNT
): Promise<RiotMatch[]> {
  const ids = await getMatchIds(puuid, region, count)
  const matches = await Promise.all(
    ids.map((id) => getMatchDetail(id, region))
  )
  return matches
}
