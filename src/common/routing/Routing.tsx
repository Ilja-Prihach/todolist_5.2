import { selectIsLoggedIn } from "@/app/app-slice.ts"
import { Main } from "@/app/Main"
import { PageNotFound, ProtectedRoute } from "@/common/components"
import { Faq } from "@/common/components/Faq/Faq.tsx"
import { useAppSelector } from "@/common/hooks"
import { Login } from "@/features/auth/ui/Login/Login"
import { Route, Routes } from "react-router"

export const Path = {
  Main: "/",
  Login: "/login",
  Faq: "/faq",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Login} />}>
        <Route path={Path.Main} element={<Main />} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>
      <Route path={Path.Faq} element={<Faq />} />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
