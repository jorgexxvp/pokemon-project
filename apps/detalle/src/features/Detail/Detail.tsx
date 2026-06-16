import { FC, useEffect } from 'react';
import { useDetailStore } from '../../store/useDetailStore';
import { useParams } from 'react-router-dom';
import { ArrowLeft, LoaderCircle, Ruler, Weight, Zap } from 'lucide-react';
import { Card, CustomButton } from '@nx-mfe-template/ui';
import {
  ResponseType,
  ROUTE_HOME,
  URL_HOST,
  useThemeStore,
} from '@nx-mfe-template/toolbox';

const Detail = () => {
  const { dataDetail, fetchDetail, response } = useDetailStore();
  const { id } = useParams();

  useEffect(() => {
    fetchDetail(Number(id));
  }, []);

  const goBack = () => {
    const theme = useThemeStore.getState().theme;
    window.location.href = `${URL_HOST}${ROUTE_HOME}?theme=${encodeURIComponent(theme)}`;
  };

  return (
    <div className="p-6 sm:p-8 flex flex-col gap-4 bg-(--color-bg-home) min-h-screen">
      {!dataDetail || response.type === ResponseType.LOADING ? (
        <div className="flex flex-col items-center justify-center gap-3 py-32 text-on-surface-variant">
          <LoaderCircle size={32} className="animate-spin text-(--color-primary)" />
          <p className="text-sm font-medium">Cargando Pokémon...</p>
        </div>
      ) : (
        <div className="animate-fade-up w-full max-w-md mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <CustomButton
              icon={<ArrowLeft size={20} />}
              className="w-10 h-10 min-w-10 rounded-full flex items-center justify-center p-0"
              onClick={goBack}
            />
            <span className="text-sm font-semibold text-on-surface-variant">
              Volver a la Pokédex
            </span>
          </div>
          <PokemonDetailCard pokemon={dataDetail} />
        </div>
      )}
    </div>
  );
};

export default Detail;

interface PokemonDetailProps {
  pokemon: {
    id: number;
    name: string;
    image: string;
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    types: string[];
    abilities: string[];
    height: number;
    weight: number;
  };
}

const PokemonDetailCard: FC<PokemonDetailProps> = ({ pokemon }) => {
  const allStats = [
    { label: `${pokemon.hp}`, value: pokemon.hp, type: 'hp' as const },
    {
      label: `${pokemon.attack}`,
      value: pokemon.attack,
      type: 'attack' as const,
    },
    {
      label: `${pokemon.defense}`,
      value: pokemon.defense,
      type: 'defense' as const,
    },
  ];

  const secondaryStats = [
    { label: 'Sp. Atk', value: pokemon.specialAttack, color: 'text-amber-500' },
    { label: 'Sp. Def', value: pokemon.specialDefense, color: 'text-blue-400' },
    { label: 'Speed', value: pokemon.speed, color: 'text-red-400' },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <Card
        name={pokemon.name}
        types={pokemon.types}
        image={pokemon.image}
        stats={allStats}
      />

      <div className="glass-card rounded-2xl p-5 border border-white/5 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="grid place-items-center w-9 h-9 rounded-lg bg-(--color-primary)/15">
              <Ruler className="text-(--color-primary)" size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold opacity-60">
                Altura
              </p>
              <p className="font-semibold text-on-surface">
                {pokemon.height / 10} m
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="grid place-items-center w-9 h-9 rounded-lg bg-(--color-primary)/15">
              <Weight className="text-(--color-primary)" size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold opacity-60">Peso</p>
              <p className="font-semibold text-on-surface">
                {pokemon.weight / 10} kg
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="flex items-center gap-1.5 text-xs uppercase font-bold opacity-60 mb-2">
            <Zap size={13} />
            Habilidades
          </p>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ability) => (
              <span
                key={ability}
                className="px-3 py-1 bg-(--color-primary)/15 text-(--color-primary) rounded-full text-xs font-semibold capitalize border border-(--color-primary)/20"
              >
                {ability.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-white/10">
          {secondaryStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-[10px] opacity-60 mb-1">{stat.label}</p>
              <p className={`font-bold text-lg ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
