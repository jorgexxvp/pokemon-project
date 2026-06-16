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
    fire: 'bg-red-500 text-white ',
    water: 'bg-blue-500 text-white ',
    grass: 'bg-green-500 text-white ',
    electric: 'bg-yellow-400 text-black ',
    poison: 'bg-purple-500 text-white ',
    ground: 'bg-amber-600 text-white ',
    rock: 'bg-stone-500 text-white ',
    fairy: 'bg-pink-300 text-white ',
    bug: 'bg-lime-500 text-white ',
    dragon: 'bg-indigo-600 text-white',
    psychic: 'bg-fuchsia-500 text-white',
    flying: 'bg-sky-300 text-white',
    fighting: 'bg-orange-600 text-white',
    normal: 'bg-slate-400 text-white',
    ghost: 'bg-violet-700 text-white',
    dark: 'bg-zinc-800 text-white',
    steel: 'bg-slate-500 text-white',
    ice: 'bg-cyan-300 text-white',
    stellar: 'bg-emerald-400 text-white',
    unknown: 'bg-gray-500 text-white',
  };

  return (
    <div
      onClick={onClick}
      className="glass-card rounded-xl p-6 group cursor-pointer transition-all duration-300 hover:bg-surface-variant/50 hover:border-white/20 border border-white/5"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-row flex-wrap gap-1.5 items-start">
          {types.map((type) => (
            <span
              key={type}
              className={`px-2 py-0.5 rounded text-[10px] font-label-caps border ${
                typeColors[type.toLowerCase()] || 'bg-gray-200 text-black'
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
