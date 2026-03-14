import { Outlet } from "react-router-dom"
import { PlayerSearchProvider } from "@/contexts/player-search"
import { Header } from "@/components/shared/Header"

/**
 * Layout comum da aplicação: header global com pesquisa e conteúdo (home/partidas).
 */
export function AppLayout() {
  return (
    <PlayerSearchProvider>
      <div className="min-h-svh flex flex-col bg-background text-foreground">
        <Header />
        <main className="min-h-0 flex-1">
          <Outlet />
        </main>
      </div>
    </PlayerSearchProvider>
  )
}
