import { FC, useEffect } from 'react';
import { useDetailStore } from '../../store/useDetailStore';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Ruler, Weight } from 'lucide-react';
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

  return (
    <div className="p-8 flex flex-col gap-4 bg-(--color-bg-home)">
      {!dataDetail || response.type === ResponseType.LOADING ? (
        <div className="flex justify-center">Cargando</div>
      ) : (
        <div>
          <CustomButton
            icon={<ArrowLeft size={20} />}
            className="w-10 h-10 rounded-full flex items-center justify-center p-0"
            onClick={() => {
              const theme = useThemeStore.getState().theme;
              window.location.href = `${URL_HOST}${ROUTE_HOME}?theme=${encodeURIComponent(theme)}`;
            }}
          />
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
    {
      label: `${pokemon.specialAttack}`,
      value: pokemon.specialAttack,
      type: 'attack' as const,
    },
    {
      label: `${pokemon.specialDefense}`,
      value: pokemon.specialDefense,
      type: 'defense' as const,
    },
    { label: `${pokemon.speed}`, value: pokemon.speed, type: 'hp' as const },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card
        name={pokemon.name}
        types={pokemon.types}
        image={pokemon.image}
        stats={allStats.slice(0, 3)}
      />

      <div className="mt-6 bg-surface-variant/20 rounded-xl p-4 border border-white/5 glass-card">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Ruler className="text-primary" />
            <div>
              <p className="text-[10px] uppercase font-bold opacity-60">
                Altura
              </p>
              <p className="font-medium">{pokemon.height / 10} m</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Weight className="text-primary" />
            <div>
              <p className="text-[10px] uppercase font-bold opacity-60">Peso</p>
              <p className="font-medium">{pokemon.weight / 10} kg</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs uppercase font-bold opacity-60 mb-2">
            Habilidades
          </p>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ability) => (
              <span
                key={ability}
                className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold border border-primary/20"
              >
                {ability.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-white/10">
          <div>
            <p className="text-[10px] opacity-60">Sp. Atk</p>
            <p className="font-bold text-amber-500">{pokemon.specialAttack}</p>
          </div>
          <div>
            <p className="text-[10px] opacity-60">Sp. Def</p>
            <p className="font-bold text-blue-400">{pokemon.specialDefense}</p>
          </div>
          <div>
            <p className="text-[10px] opacity-60">Speed</p>
            <p className="font-bold text-red-400">{pokemon.speed}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
