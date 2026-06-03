import { ROUTE_DETAIL } from '@nx-mfe-template/toolbox';
import { LayoutAdmin } from '@nx-mfe-template/ui';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Detail = lazy(() => import('../features/Detail'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route
          path={ROUTE_DETAIL}
          element={
            <LayoutAdmin>
              <Detail />
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
