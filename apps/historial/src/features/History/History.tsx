import {
  encoderJSON,
  ROUTE_HOME,
  URL_DETAIL,
  URL_HOST,
  useHistoryStore,
  useLoginStore,
  useThemeStore,
} from '@nx-mfe-template/toolbox';
import { Card, CustomButton } from '@nx-mfe-template/ui';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

type StatType = 'hp' | 'defense' | 'attack';

interface StatItem {
  label: string;
  value: number;
  type: StatType;
}

const History = () => {
  const historialRaw = useHistoryStore.getState().historial;
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);
  const jsonString = JSON.stringify(historialRaw);

  const encodedHistorial = encoderJSON(jsonString);

  const getStats = (data: {
    hp: number;
    defense: number;
    attack: number;
  }): StatItem[] => {
    return [
      { label: String(data.hp), type: 'hp', value: data.hp },
      { label: String(data.defense), type: 'defense', value: data.defense },
      { label: String(data.attack), type: 'attack', value: data.attack },
    ];
  };

  const handleClearHistory = () => {
    useHistoryStore.getState().clearCache();

    setShowDeletedMessage(true);

    setTimeout(() => {
      setShowDeletedMessage(false);
    }, 3000);
  };

  return (
    <div className="p-8 bg-(--color-bg-home) flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 w-full">
        <div className="flex flex-row gap-5 items-center w-full sm:w-auto">
          <CustomButton
            icon={<ArrowLeft />}
            className="w-10 h-10 min-w-10 rounded-full flex items-center justify-center p-0"
            onClick={() => {
              const theme = useThemeStore.getState().theme;

              window.location.href = `${URL_HOST}${ROUTE_HOME}?theme=${encodeURIComponent(theme)}&historial=${encodedHistorial}`;
            }}
          />
          <h1 className="text-lg sm:text-xl font-bold truncate">
            Historial Pokedex
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-end">
          <CustomButton
            className="w-full sm:w-fit p-2 whitespace-nowrap"
            text="Borrar Historial"
            onClick={handleClearHistory}
          />
        </div>
      </div>
      {showDeletedMessage && (
        <p className="text-sm text-green-500 animate-pulse font-bold w-full text-center p-6">
          ¡Historial borrado correctamente!
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {!showDeletedMessage &&
          historialRaw?.map((data, idx) => (
            <Card
              key={idx}
              onClick={() => {
                const userName = useLoginStore.getState().name || '';
                const rol = useLoginStore.getState().rol || '';
                const theme = useThemeStore.getState().theme;

                window.location.href = `${URL_DETAIL}/detail/${data.id}?user=${encodeURIComponent(userName)}&rol=${encodeURIComponent(rol)}&historial=${encodedHistorial}&theme=${encodeURIComponent(theme)}`;
              }}
              image={data.image}
              name={data.name}
              stats={getStats(data)}
              types={data.types}
            />
          ))}
      </div>
    </div>
  );
};

export default History;
