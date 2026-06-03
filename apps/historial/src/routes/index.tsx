import { ROUTE_HISTORY } from '@nx-mfe-template/toolbox';
import { LayoutAdmin } from '@nx-mfe-template/ui';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const History = lazy(() => import('../features/History'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route
          path={ROUTE_HISTORY}
          element={
            <LayoutAdmin>
              <History />
            </LayoutAdmin>
          }
        />

        <Route
          path="*"
          element={<div>Ruta no encontrada: {window.location.pathname}</div>}
        />
      </Routes>
    </Suspense>
  );
};
