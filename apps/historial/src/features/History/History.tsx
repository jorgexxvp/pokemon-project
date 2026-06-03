import {
  ROUTE_HOME,
  URL_DETAIL,
  URL_HOST,
  useHistoryStore,
  useLoginStore,
} from '@nx-mfe-template/toolbox';
import { Card, CustomButton } from '@nx-mfe-template/ui';
import { ArrowLeft } from 'lucide-react';

type StatType = 'hp' | 'defense' | 'attack';

interface StatItem {
  label: string;
  value: number;
  type: StatType;
}

const History = () => {
  const historialRaw = useHistoryStore.getState().historial;

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

  return (
    <div className="p-8 bg-(--color-bg-home) flex flex-col gap-4">
      <div>
        <div>
          <CustomButton
            icon={<ArrowLeft size={20} />}
            className="w-10 h-10 rounded-full flex items-center justify-center p-0"
            onClick={() => {
              window.location.href = `${URL_HOST}${ROUTE_HOME}`;
            }}
          />
          <h1 className="text-xl">Historial Pokedex (Visto reciente)</h1>
        </div>
        <CustomButton onClick={() => {}} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {historialRaw?.map((data, idx) => (
          <Card
            key={idx}
            onClick={() => {
              const userName = useLoginStore.getState().name || '';
              const rol = useLoginStore.getState().rol || '';

              const jsonString = JSON.stringify(historialRaw);

              const encodedHistorial = btoa(encodeURIComponent(jsonString))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');

              window.location.href = `${URL_DETAIL}/detail/${data.id}?user=${encodeURIComponent(userName)}&rol=${encodeURIComponent(rol)}&historial=${encodedHistorial}`;
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
