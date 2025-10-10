import { obtenerArbolCategorias } from "@/app/_lib/servicios";
import FiltroCategorias from "./filtroCategorias";

const FiltroCategoriasContenedor = async ({ categoriaSlug }: { categoriaSlug: string[] }) => {
  const arbolCategoria = await obtenerArbolCategorias();

  return (
    <FiltroCategorias arbolCategoria={arbolCategoria || {}} categoriaSlug={categoriaSlug} />
  );
};

export default FiltroCategoriasContenedor;
