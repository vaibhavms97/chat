import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

const PrivateRouteCollection = () => {
  const isUserLoggedIn = localStorage.getItem('id');
  return isUserLoggedIn ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />
}

export default PrivateRouteCollection;