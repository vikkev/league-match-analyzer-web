import { Route } from "react-router-dom"
import { HomePage } from "./HomePage"

/** Rota da página Home. Cada página exporta seu próprio Route. */
export function HomeRoute() {
  return <Route path="/" element={<HomePage />} />
}
