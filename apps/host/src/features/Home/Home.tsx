import {
  Card,
  CustomButton,
  CustomSelect,
  InputText,
  ModalBase,
  Toast,
} from '@nx-mfe-template/ui';
import { useHomeStore } from '../../store/useHomeStore';
import { ResponseType } from '@nx-mfe-template/toolbox';
import { HomeHook } from './Home.hook';
import { Search } from 'lucide-react';

const Home = () => {
  const { categoryData, fetchListData, resetListData, response, listData } =
    useHomeStore();

  const {
    open,
    setOpen,
    PokemonTypes,
    getStats,
    hookform,
    observerTarget,
    offset,
    showToast,
    toastData,
    handlePokemonClick,
  } = HomeHook();

  return (
    <div className="p-8 flex flex-col gap-4 bg-(--color-bg-home)">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 w-full">
        <div className="w-full sm:flex-1 sm:max-w-xs">
          <CustomSelect
            text="Seleccionar Categoria"
            data={PokemonTypes}
            hookform={hookform}
            name="pokemonType"
          />
        </div>

        <div className="w-full sm:w-auto">
          <CustomButton
            className="w-full sm:w-fit p-4 h-10 sm:h-8 flex items-center justify-center"
            onClick={() => {
              resetListData();
              fetchListData({ limit: 30, offset: 0 }, false);
              setOpen(true);
              offset.current = 0;
            }}
            text="Buscar Pokemon"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {categoryData?.map((data, idx) => (
          <Card
            key={idx}
            onClick={() => handlePokemonClick(data)}
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
            <div className="sticky top-0 z-20 pb-2 flex flex-row justify-between items-end gap-4">
              <div className="flex-1">
                <InputText
                  label="Buscar Pokemones"
                  name="search"
                  methods={hookform}
                  icon={<Search />}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listData?.map((data, idx) => (
                <Card
                  onClick={() => handlePokemonClick(data)}
                  key={idx}
                  image={data.image}
                  name={data.name}
                  stats={getStats(data)}
                  types={data.types}
                />
              ))}

              {listData?.length === 0 && <div>No se encontro el pokemon</div>}
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

      {showToast && toastData && (
        <Toast description={toastData.name} imageUrl={toastData.image} />
      )}
    </div>
  );
};

export default Home;
