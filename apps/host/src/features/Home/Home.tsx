import {
  Card,
  CustomButton,
  CustomSelect,
  InputText,
  ModalBase,
} from '@nx-mfe-template/ui';
import { useHomeStore } from '../../store/useHomeStore';
import {
  ResponseType,
  URL_DETAIL,
  useHistoryStore,
  useLoginStore,
} from '@nx-mfe-template/toolbox';
import { HomeHook } from './Home.hook';
import { Search } from 'lucide-react';

const Home = () => {
  const { categoryData, fetchListData, resetListData, response } =
    useHomeStore();

  const {
    open,
    setOpen,
    PokemonTypes,
    getStats,
    hookform,
    offset,
    observerTarget,
    filteredListData,
  } = HomeHook();

  return (
    <div className="p-8 flex flex-col gap-4 bg-(--color-bg-home)">
      <div className="flex flex-row justify-between items-center">
        <CustomSelect
          text="Seleccionar Categoria"
          data={PokemonTypes}
          hookform={hookform}
          name="pokemonType"
        />
        <CustomButton
          className="w-fit p-4 h-8"
          onClick={() => {
            resetListData();
            offset.current = 0;
            fetchListData({ limit: 30, offset: 0 }, false);
            setOpen(true);
          }}
          text="Buscar Pokemon"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {categoryData?.map((data, idx) => (
          <Card
            key={idx}
            onClick={() => {
              const historialRaw = useHistoryStore.getState().historial || [];
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

      {open && (
        <ModalBase setOpen={setOpen} title="Lista Pokemon">
          <div className="flex flex-col gap-4 h-full p-3">
            <div className="sticky top-0 z-20 pb-2">
              <InputText
                label="Buscar Pokemones"
                name="search"
                methods={hookform}
                icon={<Search />}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredListData?.map((data, idx) => (
                <Card
                  key={idx}
                  image={data.image}
                  name={data.name}
                  stats={getStats(data)}
                  types={data.types}
                />
              ))}

              <div ref={observerTarget} className="h-4 w-full col-span-full" />
            </div>

            {response.type === ResponseType.LOADING && (
              <div className="text-center py-4 text-sm text-(--color-on-surface-variant)">
                Cargando más...
              </div>
            )}
          </div>
        </ModalBase>
      )}
    </div>
  );
};

export default Home;
