import { Suspense } from "react";
import FiltroCategorias from "./Categorias";
import FiltroMarcas from "./Marcas";
import EncabezadoFiltros from "./Encabezado";
import PieFiltros from "./Pie";
import SkeletonFiltroMarcas from "../../../Skeletons/FiltroMarcasMovil";
import SkeletonFiltroCategorias from "../../../Skeletons/FiltroCategoriasMovil";

const ModalFiltrosMovil = (
  { categoriaSlug, marcasSlug, idCategoriasSlug, idMarcasSlug }:
  { categoriaSlug: string[], marcasSlug: string[], idCategoriasSlug: string, idMarcasSlug: string }
) => {
  return (
    <section id='contenedorFiltrosMovil' role='dialog' className='hidden flex-col gap-3 fixed z-50 top-0 left-0 w-full h-full py-6 px-3 bg-black/30 bg-white text-neutral-800 overflow-y-scroll'>
      <EncabezadoFiltros />
      <Suspense key={idCategoriasSlug} fallback={<SkeletonFiltroCategorias />}>
        <FiltroCategorias categoriaSlug={categoriaSlug} />
      </Suspense>
      <Suspense key={`${idCategoriasSlug}-${idMarcasSlug}`}  fallback={<SkeletonFiltroMarcas />}>
        <FiltroMarcas categoriaSlug={categoriaSlug} marcasSlug={marcasSlug} />
      </Suspense>
      <PieFiltros />
    </section>
  );
};

export default ModalFiltrosMovil;
