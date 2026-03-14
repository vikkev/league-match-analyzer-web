import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { TextInput } from "@/components/ui/inputs/text-input"
import {
  SelectInput,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/inputs/select-input"
import { usePlayerSearch } from "@/contexts/player-search"
import { useTranslation } from "@/contexts/i18n"
import { REGIONS } from "@/pages/home/utils/riot-id.utils"
import type { RiotRegion } from "@/pages/home/types"
import { Hexagon, Search } from "lucide-react"
import { ModeToggle } from "../mode-toggle"
import { LanguageSelector } from "../language-selector"

export function Header() {
  const { t } = useTranslation()
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
    <header className="border-b border-border bg-secondary/95 backdrop-blur px-8 py-4">
      <div className="relative flex h-14 items-center">

        {/* Logo — fixado à esquerda */}
        <div className="absolute">
          <Link
            to="/"
            className="group flex items-center gap-1.5 text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
          >
            <Hexagon className="size-4 shrink-0 text-primary opacity-80 transition-opacity group-hover:opacity-100" />
            {t("header.home")}
          </Link>
        </div>

        {/* Busca — centralizada absolutamente */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <form
            onSubmit={search}
            className="flex h-9 items-center gap-1.5"
          >
            <div className="flex h-9 items-center gap-1 rounded-lg border border-border bg-muted/50 px-2 transition-colors focus-within:border-primary/50 focus-within:bg-background">
              <Search className="w-3.5 shrink-0 text-muted-foreground" />
              <TextInput
                type="text"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                placeholder={t("header.search.placeholder.name")}
                disabled={loading}
                autoComplete="off"
                className="h-7 w-28 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
              />
              <span className="text-muted-foreground/50">#</span>
              <TextInput
                type="text"
                value={tagLine}
                onChange={(e) => setTagLine(e.target.value)}
                placeholder={t("header.search.placeholder.tag")}
                disabled={loading}
                autoComplete="off"
                className="h-7 w-16 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
              />
            </div>

            <SelectInput
              value={region}
              onValueChange={(v) => setRegion(v as RiotRegion)}
              disabled={loading}
            >
              <SelectTrigger className="h-9! w-24 shrink-0 text-xs">
                <SelectValue placeholder={t("header.search.placeholder.region")} />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {t(r.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectInput>

            <Button type="submit" disabled={loading} size="default" className="h-9 shrink-0 px-4 text-xs">
              {loading ? t("header.search.button.loading") : t("header.search.button")}
            </Button>
          </form>
        </div>

        {/* Theme + language — right */}
        <div className="absolute right-4 flex items-center gap-1.5">
          <LanguageSelector />
          <ModeToggle />
        </div>
      </div>

      {error && (
        <div
          className="border-t border-destructive/20 bg-destructive/10 px-4 py-2 text-center text-xs text-destructive"
          role="alert"
        >
          {error}
        </div>
      )}
    </header>
  )
}