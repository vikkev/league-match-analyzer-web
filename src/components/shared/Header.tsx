import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { TextInput } from "@/components/ui/inputs/text"
import {
  SelectInput,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/inputs/select"
import { usePlayerSearch } from "@/contexts/player-search"
import { REGIONS } from "@/pages/home/utils/riot-id.utils"
import type { RiotRegion } from "@/pages/home/types"

export function Header() {
  const {
    gameName,
    setGameName,
    tagLine,
    setTagLine,
    region,
    setRegion,
    error,
    loading,
    search,
  } = usePlayerSearch()

  return (
    <header className="border-b border-border bg-background">
      <div className="flex flex-col gap-4 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            ← Início
          </Link>
          <span className="text-sm text-muted-foreground">
            League Match Analyzer
          </span>
        </div>

        <form
          onSubmit={search}
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2"
        >
          <TextInput
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="Nome"
            disabled={loading}
            autoComplete="off"
            className="w-full sm:w-36"
          />
          <TextInput
            type="text"
            value={tagLine}
            onChange={(e) => setTagLine(e.target.value)}
            placeholder="Tag (ex: BR1)"
            disabled={loading}
            autoComplete="off"
            className="w-full sm:w-24"
          />
          <SelectInput
            value={region}
            onValueChange={(v) => setRegion(v as RiotRegion)}
            disabled={loading}
          >
            <SelectTrigger className="w-full sm:w-28">
              <SelectValue placeholder="Região" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectInput>
          <Button type="submit" disabled={loading} size="default">
            {loading ? "Buscando…" : "Buscar"}
          </Button>
        </form>
      </div>

      {error && (
        <div
          className="border-t border-destructive/20 bg-destructive/10 px-4 py-2 text-sm text-destructive"
          role="alert"
        >
          {error}
        </div>
      )}
    </header>
  )
}
