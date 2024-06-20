import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from 'pages/login'
import PrivateRouteCollection from './privateRouteCollection'
import { ROUTES } from 'constants/routes'
import Dashboard from 'pages/dashboard'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />
        <Route element={<PrivateRouteCollection />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;