import { Heart, Shield, Swords } from 'lucide-react';

interface CardProps {
  name: string;
  types: string[];
  stats: { label: string; value: number; type: 'hp' | 'defense' | 'attack' }[];
  image: string;
  onClick?: () => void;
  count?: string;
}

export const Card = ({
  name,
  types,
  stats,
  image,
  onClick,
  count,
}: CardProps) => {
  const typeColors: Record<string, string> = {
    fire: 'bg-red-500 text-white border-red-700',
    water: 'bg-blue-500 text-white border-blue-700',
    grass: 'bg-green-500 text-white border-green-700',
    electric: 'bg-yellow-400 text-black border-yellow-600',
    poison: 'bg-purple-500 text-white border-purple-700',
    ground: 'bg-amber-600 text-white border-amber-800',
    rock: 'bg-stone-500 text-white border-stone-700',
    fairy: 'bg-pink-300 text-white border-pink-500',
    bug: 'bg-lime-500 text-white border-lime-700',
    dragon: 'bg-indigo-600 text-white border-indigo-800',
    psychic: 'bg-fuchsia-500 text-white border-fuchsia-700',
    flying: 'bg-sky-300 text-white border-sky-500',
    fighting: 'bg-orange-600 text-white border-orange-800',
    normal: 'bg-slate-400 text-white border-slate-600',
    ghost: 'bg-violet-700 text-white border-violet-900',
    dark: 'bg-zinc-800 text-white border-zinc-950',
    steel: 'bg-slate-500 text-white border-slate-700',
    ice: 'bg-cyan-300 text-white border-cyan-500',
    stellar: 'bg-emerald-400 text-white border-emerald-600',
    unknown: 'bg-gray-500 text-white border-gray-700',
  };

  return (
    <div
      onClick={onClick}
      className="glass-card rounded-xl p-6 group cursor-pointer transition-all duration-300 hover:bg-surface-variant/50 hover:border-white/20 border border-white/5"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-1.5 items-end">
          {types.map((type) => (
            <span
              key={type}
              className={`px-2 py-0.5 rounded text-[10px] font-label-caps border ${
                typeColors[type.toLowerCase()] ||
                'bg-gray-200 text-black border-gray-400'
              }`}
            >
              {type.toUpperCase()}
            </span>
          ))}
        </div>
        {count && (
          <p className="flex items-center gap-2">
            <span className="opacity-70 text-headline-lg text-on-surface">
              Visto:
            </span>
            <span className="text-headline-lg text-on-surface font-bold">
              {count}
            </span>
          </p>
        )}
      </div>

      <div className="relative h-48 mb-6 flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700"></div>
        <img
          src={image}
          alt={name}
          className="relative z-10 w-40 h-40 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 ease-out"
        />
      </div>

      <h3 className="font-display-lg text-headline-lg text-on-surface mb-4 capitalize">
        {name}
      </h3>
      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.type} className="flex items-center gap-3">
            <span className="w-6 flex items-center justify-center text-on-surface-variant/70">
              {stat.type === 'hp' && (
                <Heart size={16} className="text-red-400" />
              )}
              {stat.type === 'defense' && (
                <Shield size={16} className="text-blue-400" />
              )}
              {stat.type === 'attack' && (
                <Swords size={16} className="text-amber-500" />
              )}
            </span>

            <span className="w-8 font-bold text-on-surface">{stat.label}</span>

            <div className="flex-1 h-1.5 stat-bar-bg rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  stat.type === 'hp'
                    ? 'bg-red-400'
                    : stat.type === 'defense'
                      ? 'bg-blue-400'
                      : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(stat.value, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
