import { usePlayerSearch } from "@/contexts/player-search"
import { MatchHistory } from "./components/MatchHistory"

export function HomePage() {
  const { player, region } = usePlayerSearch()

  return (
    <div className="flex min-h-full w-full p-6">
      <div className="flex max-w-md min-w-0 flex-1 flex-col gap-6 text-sm leading-loose text-foreground">
        {player ? (
          <>
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
              <p className="font-medium text-foreground">
                {player.gameName}#{player.tagLine}
              </p>
              <p className="mt-1 font-mono text-xs text-muted-foreground break-all">
                PUUID: {player.puuid}
              </p>
            </div>
            <MatchHistory puuid={player.puuid} region={region} />
          </>
        ) : (
          <div
            className="rounded-lg border border-dashed border-border bg-muted/20 p-6 text-center text-sm text-muted-foreground"
            aria-hidden="true"
          >
            Use a pesquisa no header para buscar um jogador pelo Riot ID.
          </div>
        )}
      </div>
    </div>
  )
}
