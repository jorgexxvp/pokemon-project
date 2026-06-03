import { ROUTE_HOME, ROUTE_LOGIN } from '@nx-mfe-template/toolbox';
import { LayoutAdmin, LayoutPublic } from '@nx-mfe-template/ui';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Login = lazy(() => import('../features/Login'));
const Home = lazy(() => import('../features/Home'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route
          path={ROUTE_LOGIN}
          element={
            <LayoutPublic>
              <Login />
            </LayoutPublic>
          }
        />
        <Route
          path={ROUTE_HOME}
          element={
            <LayoutAdmin>
              <Home />
            </LayoutAdmin>
          }
        />

        <Route path="*" element={<Navigate to={ROUTE_LOGIN} replace />} />
      </Routes>
    </Suspense>
  );
};
