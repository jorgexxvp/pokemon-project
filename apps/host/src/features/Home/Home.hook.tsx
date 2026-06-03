import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHomeStore } from '../../store/useHomeStore';
import { useForm } from 'react-hook-form';
import { ResponseType } from '@nx-mfe-template/toolbox';

type StatType = 'hp' | 'defense' | 'attack';

interface StatItem {
  label: string;
  value: number;
  type: StatType;
}

export const HomeHook = () => {
  const { fetchCategoryData, fetchListData, response, listData } =
    useHomeStore();

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

  const [open, setOpen] = useState(false);
  const observerTarget = useRef(null);
  const offset = useRef(0);
  const hookform = useForm<{ pokemonType: string; search: string }>({
    defaultValues: { pokemonType: 'fire', search: '' },
  });

  const selectedType = hookform.watch('pokemonType');
  const search = hookform.watch('search');

  const loadMore = useCallback(() => {
    if (response.type === ResponseType.LOADING) return;
    offset.current += 30;
    fetchListData({ limit: 30, offset: offset.current }, true);
  }, [fetchListData, response.type]);

  const filteredListData = useMemo(() => {
    if (!listData) return [];
    const searchTerm = search.toLowerCase();
    return listData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm),
    );
  }, [listData, search]);

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
  }, [selectedType, fetchCategoryData]);

  return {
    PokemonTypes,
    getStats,
    open,
    setOpen,
    hookform,
    offset,
    observerTarget,
    filteredListData,
  };
};
