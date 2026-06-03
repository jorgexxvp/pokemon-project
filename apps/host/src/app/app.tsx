import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '../routes';

export function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
      }}
    >
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
