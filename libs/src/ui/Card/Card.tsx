import { Heart, Shield, Swords } from 'lucide-react';

interface CardProps {
  name: string;
  types: string[];
  stats: { label: string; value: number; type: 'hp' | 'defense' | 'attack' }[];
  image: string;
  onClick?: () => void;
}

export const Card = ({ name, types, stats, image, onClick }: CardProps) => {
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
              className="stat-bar-bg px-2 py-0.5 rounded text-[10px] font-label-caps text-primary border border-primary/30"
            >
              {type.toUpperCase()}
            </span>
          ))}
        </div>
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
