import { Routes, Route } from "react-router-dom"
import { AppLayout } from "@/components/AppLayout"
import { HomePage } from "@/pages/home/HomePage"
import { PartidasPage } from "@/pages/partidas/PartidasPage"

/**
 * Rotas da aplicação.
 * Home e Partidas ficam dentro do mesmo Layout (sempre aparece "Início" no topo).
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="partidas/:id" element={<PartidasPage />} />
      </Route>
    </Routes>
  )
}
