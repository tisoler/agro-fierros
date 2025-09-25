import { obtenerCategorias } from "@/app/_lib/servicios";
import CategoriaBloque from "./categoriaBloque";

const ListaCategorias = async () => {
  const categorias = await obtenerCategorias();

  return (
    <div className="w-full flex justify-center px-2 md:px-20 pb-20 md:pb-30 bg-color-fondo-gris">
      <section className="max-w-[1900px] w-full grid grid grid-cols-1 items-center md:grid-cols-9 gap-4">
        {
          categorias?.map((categoria, idx) => (
            <CategoriaBloque key={categoria.id} categoria={categoria} esGrande={[0, 3, 4, 7].includes(idx)} />
          ))
        }
      </section>
    </div>
  );
};

export default ListaCategorias;
