import { obtenerRastroCategorias, obtenerUnidadBusqueda, obtenerUnidadPorSlug } from "@/app/_lib/servicios";
import Unidad from "./Unidad";
import NavegadorCategorias from "../NavegadorCategorias";
import CarruselUnidades from "../CarruselUnidades";
import { CANTIDAD_UNIDADES_RELACIONADAS } from "@/app/_lib/constantes";
import { UnidadConMarcaCategoria } from "@/app/_lib/tipos";

const obtenerUnidadesParaCategorias = async (unidadActual: UnidadConMarcaCategoria,unidadesPrevias: UnidadConMarcaCategoria[], categoriaSlug: string[]): Promise<UnidadConMarcaCategoria[]> => {
  // Obtiene las unidades para categorías, filtra las existentes en unidadesPrevias y agrega las que falta para llegar a la cantidad esperada
  const resultado = await obtenerUnidadBusqueda({ categoriaSlug })();
  let unidades = resultado?.unidadesFiltradas || [];
  unidades = unidades
    ?.filter(uni => !unidadesPrevias?.map(u => u.id)?.includes(uni.id) && unidadActual.id !== uni.id)
    ?.slice(0, CANTIDAD_UNIDADES_RELACIONADAS - unidadesPrevias.length)
  || [];
  return unidades;
};

const UnidadContenedor = async ({ slug, esDispositivoMovil = true }: { slug: string, esDispositivoMovil?: boolean }) => {
  const unidad = slug ? await obtenerUnidadPorSlug(slug)() : null;

  if (!unidad) {
    return (
      <div className="flex justify-center items-center h-[587px]">
        <NavegadorCategorias categorias={[]} />
        <p className="text-xl font-semibold text-neutral-800">Unidad no encontrada</p>
      </div>
    );
  }

  const navegacionPorCategorias = (await obtenerRastroCategorias(unidad.categorias?.[0].id || -1)() || []).reverse();

  const unidades: UnidadConMarcaCategoria[] = [];
  const categoriasUnidad = unidad.categorias?.map(c => c.slug);
  if (categoriasUnidad?.length) {
    const unidadesMismaCategorias = await obtenerUnidadesParaCategorias(unidad, unidades, categoriasUnidad);
    unidades.push(...unidadesMismaCategorias || []);
  }

  if (unidades?.length < CANTIDAD_UNIDADES_RELACIONADAS) {
    const categoriasPadres = navegacionPorCategorias?.filter(cat => cat.id !== 1)?.map(cat => cat.slug);
    if (categoriasPadres.length) {
      const unidadesCategoriasPadres = await obtenerUnidadesParaCategorias(unidad, unidades, categoriasPadres);
      unidades.push(...unidadesCategoriasPadres);
    }
  }

  if (unidades?.length < CANTIDAD_UNIDADES_RELACIONADAS) {
    const unidadesTodasCategorias = await obtenerUnidadesParaCategorias(unidad, unidades, ['todas']);
    unidades.push(...unidadesTodasCategorias);
  }

  return (
    <>
      <div className="flex justify-start w-full max-w-[1200px]">
        <NavegadorCategorias categorias={navegacionPorCategorias} />
      </div>
      <div className="flex flex-col max-w-[1200px] w-full bg-white px-2 md:px-8">
        <Unidad unidad={unidad} esDispositivoMovil={esDispositivoMovil} />
      </div>
      <div className="flex flex-col max-w-[1200px] w-full bg-white px-2 md:px-8">
        <CarruselUnidades
          unidades={unidades}
          titulo='Unidades que te pueden interesar'
          variante='chico'
        />
      </div>
    </>
  );
};

export default UnidadContenedor;
