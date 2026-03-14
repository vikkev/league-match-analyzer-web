import { Route } from "react-router-dom"
import { PartidasPage } from "./PartidasPage"

/** Rota da página de detalhe da partida: /partidas/:id */
export function PartidasRoute() {
  return <Route path="/partidas/:id" element={<PartidasPage />} />
}
