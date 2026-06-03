import { useSearchParams } from 'react-router-dom';
import { AppRoutes } from '../routes';
import { useEffect } from 'react';
import {
  useHistoryStore,
  useLoginStore,
  useThemeStore,
} from '@nx-mfe-template/toolbox';

export function App() {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get('user');
  const rol = searchParams.get('rol');
  const encodedHistorial = searchParams.get('historial');
  const theme = searchParams.get('theme') as 'light' | 'dark';

  useEffect(() => {
    if (userName) {
      useLoginStore.setState({ name: userName, rol: rol });
    }
    if (theme) {
      useThemeStore.getState().setTheme(theme);
    }
  }, [userName, theme]);

  useEffect(() => {
    if (encodedHistorial) {
      try {
        let base64 = encodedHistorial.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) base64 += '=';

        const jsonString = decodeURIComponent(atob(base64));
        const parsedData = JSON.parse(jsonString);

        useHistoryStore.setState({ historial: parsedData });
      } catch (e) {
        console.error('Error al procesar el historial desde la URL:', e);
      }
    }
  }, [encodedHistorial]);

  return <AppRoutes />;
}

export default App;
