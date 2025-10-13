import { Suspense } from "react";
import SkeletonFiltroCategorias from "../../Skeletons/FiltroCategoriasEscritorio";
import SkeletonFiltroMarcas from "../../Skeletons/FiltroMarcasEscritorio";
import FiltroCategoriasEscritorio from './FiltrosCategorias';
import FiltroMarcasEscritorio from './FiltrosMarcas';

type FiltrosOrdenEscritorioProps = {
  categoriaSlug: string[],
  marcasSlug: string[],
  idCategoriasSlug: string
};

const FiltrosOrdenEscritorio = ({ categoriaSlug, marcasSlug, idCategoriasSlug }: FiltrosOrdenEscritorioProps) => {
  return (
    <section className="w-fit whitespace-nowrap hidden md:flex flex-col text-neutral-800 min-w-[250px] h-full gap-2">
      <h2 className="text-xl font-semibold text-center">Filtros</h2>
      <Suspense fallback={<SkeletonFiltroCategorias />}>
        <FiltroCategoriasEscritorio categoriaSlug={categoriaSlug} />
      </Suspense>
      <Suspense key={idCategoriasSlug} fallback={<SkeletonFiltroMarcas />}>
        <FiltroMarcasEscritorio marcasSlug={marcasSlug} />
      </Suspense>
    </section>
  );
};

export default FiltrosOrdenEscritorio;
