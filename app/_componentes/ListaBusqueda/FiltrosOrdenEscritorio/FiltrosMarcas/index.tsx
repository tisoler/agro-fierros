import { obtenerMarcasParaCategoria } from "@/app/_lib/servicios";
import FiltroMarcas from "./filtroMarcas";

const FiltroMarcasContenedor = async ({ categoriaSlug, marcasSlug }: { categoriaSlug: string[], marcasSlug: string[] }) => {
  const marcas = await obtenerMarcasParaCategoria(categoriaSlug)();

  return (
    <FiltroMarcas marcas={marcas || []} marcasSlug={marcasSlug} />
  );
};

export default FiltroMarcasContenedor;
