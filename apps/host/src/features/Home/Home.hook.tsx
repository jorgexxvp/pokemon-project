import { useCallback, useEffect, useRef, useState } from 'react';
import { useHomeStore } from '../../store/useHomeStore';
import { useForm } from 'react-hook-form';
import {
  encoderJSON,
  IData,
  ResponseType,
  URL_DETAIL,
  useHistoryStore,
  useLoginStore,
  useThemeStore,
} from '@nx-mfe-template/toolbox';

type StatType = 'hp' | 'defense' | 'attack';

interface StatItem {
  label: string;
  value: number;
  type: StatType;
}

export const HomeHook = () => {
  const { fetchCategoryData, fetchListData, response, fetchSearch } =
    useHomeStore();

  const { historial, addToHistorial } = useHistoryStore();

  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [toastData] = useState(() => {
    const h = useHistoryStore.getState().historial;
    return h && h.length > 0
      ? {
          name: h[0].name,
          image: h[0].image,
          pokemonId: h[0].id,
        }
      : null;
  });

  const observerTarget = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const hookform = useForm<{ pokemonType: string; search: string }>({
    defaultValues: { pokemonType: 'fire', search: '' },
  });
  const selectedType = hookform.watch('pokemonType');
  const search = hookform.watch('search');

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

  const PokemonTypes = [
    { name: 'normal', id: 1 },
    { name: 'fighting', id: 2 },
    { name: 'flying', id: 3 },
    { name: 'poison', id: 4 },
    { name: 'ground', id: 5 },
    { name: 'rock', id: 6 },
    { name: 'bug', id: 7 },
    { name: 'ghost', id: 8 },
    { name: 'steel', id: 9 },
    { name: 'fire', id: 10 },
    { name: 'water', id: 11 },
    { name: 'grass', id: 12 },
    { name: 'electric', id: 13 },
    { name: 'psychic', id: 14 },
    { name: 'ice', id: 15 },
    { name: 'dragon', id: 16 },
    { name: 'dark', id: 17 },
    { name: 'fairy', id: 18 },
    { name: 'stellar', id: 19 },
    { name: 'unknown', id: 10001 },
  ];

  const handlePokemonClick = useCallback((data: IData) => {
    const existingPokemon = historial?.find((h) => h.id === data.id);
    const updatedPokemon = {
      ...data,
      count: (existingPokemon?.count || 0) + 1,
    };
    addToHistorial(updatedPokemon);

    const navigationTimer = setTimeout(() => {
      const userName = useLoginStore.getState().name || '';
      const rol = useLoginStore.getState().rol || '';
      const theme = useThemeStore.getState().theme || '';
      const historialRaw = useHistoryStore.getState().historial || [];
      const jsonString = JSON.stringify(historialRaw);

      const encodedHistorial = encoderJSON(jsonString);

      window.location.href = `${URL_DETAIL}/detail/${data.id}?user=${encodeURIComponent(userName)}&rol=${encodeURIComponent(rol)}&historial=${encodedHistorial}&theme=${encodeURIComponent(theme)}`;
    }, 300);

    return () => {
      clearTimeout(navigationTimer);
    };
  }, []);

  const loadMore = useCallback(() => {
    if (response.type === ResponseType.LOADING) return;

    if (search.length > 0) return;

    offset.current += 30;
    fetchListData({ limit: 30, offset: offset.current }, true);
  }, [fetchListData, response.type, search]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },

      { threshold: 0.1 },
    );

    const target = observerTarget.current;

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [loadMore]);

  useEffect(() => {
    if (selectedType) fetchCategoryData(selectedType);
    setTimeout(() => {
      setShowToast(true);
    }, 200);
  }, [selectedType, fetchCategoryData]);

  useEffect(() => {
    if (!search) return;

    const handler = setTimeout(() => {
      fetchSearch(search.toLowerCase());
    }, 500);

    return () => clearTimeout(handler);
  }, [search, fetchSearch]);

  return {
    PokemonTypes,
    getStats,
    open,
    setOpen,
    hookform,
    offset,
    observerTarget,
    showToast,
    toastData,
    handlePokemonClick,
  };
};
