import { obtenerRastro, obtenerUnidadPorSlug } from "@/app/_lib/servicios";
import Unidad from "./Unidad";
import NavegadorCategorias from "../NavegadorCategorias";

const UnidadContenedor = async ({ slug }: { slug: string }) => {
  const unidad = slug ? await obtenerUnidadPorSlug(slug)() : null;

  if (!unidad) {
    return <p>Unidad no encontrada</p>;
  }

  const navegacionPorCategorias = (await obtenerRastro(unidad.idCategoria)()).reverse();

  return (
    <>
      <div className="flex justify-start w-full max-w-[1200px]">
        <NavegadorCategorias categorias={navegacionPorCategorias} />
      </div>
      <div className="flex flex-col max-w-[1200px] w-full bg-white px-2 md:px-8">
        <Unidad unidad={unidad} />
      </div>
    </>
  );
};

export default UnidadContenedor;
