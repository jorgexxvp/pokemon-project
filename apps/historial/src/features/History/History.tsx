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
import { ArrowLeft, CheckCircle2, History as HistoryIcon, Trash2 } from 'lucide-react';
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

  const hasHistory = !showDeletedMessage && historialRaw && historialRaw.length > 0;

  return (
    <div className="p-6 sm:p-8 bg-(--color-bg-home) min-h-screen flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 w-full">
        <div className="flex flex-row gap-4 items-center w-full sm:w-auto">
          <CustomButton
            icon={<ArrowLeft />}
            className="w-10 h-10 min-w-10 rounded-full flex items-center justify-center p-0"
            onClick={() => {
              const theme = useThemeStore.getState().theme;

              window.location.href = `${URL_HOST}${ROUTE_HOME}?theme=${encodeURIComponent(theme)}&historial=${encodedHistorial}`;
            }}
          />
          <div className="flex flex-col">
            <h1 className="flex items-center gap-2 text-lg sm:text-2xl font-bold text-on-surface">
              <HistoryIcon className="text-(--color-primary)" size={24} />
              Historial Pokédex
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              {historialRaw?.length ?? 0} Pokémon visitados
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-end">
          <CustomButton
            className="w-full sm:w-fit px-5 py-2.5 whitespace-nowrap flex items-center gap-2"
            text="Borrar Historial"
            icon={<Trash2 size={16} />}
            onClick={handleClearHistory}
          />
        </div>
      </div>

      {showDeletedMessage && (
        <div className="animate-fade-up flex items-center justify-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 font-semibold p-4 text-sm">
          <CheckCircle2 size={18} />
          ¡Historial borrado correctamente!
        </div>
      )}

      {hasHistory ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {historialRaw.map((data, idx) => (
            <div
              key={idx}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(idx * 40, 400)}ms` }}
            >
              <Card
                count={String(data.count)}
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
            </div>
          ))}
        </div>
      ) : (
        !showDeletedMessage && (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-on-surface-variant">
            <div className="grid place-items-center w-16 h-16 rounded-full glass-card">
              <HistoryIcon size={28} className="opacity-60" />
            </div>
            <p className="font-semibold text-on-surface">
              Tu historial está vacío
            </p>
            <p className="text-sm max-w-xs">
              Los Pokémon que visites aparecerán aquí.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default History;
