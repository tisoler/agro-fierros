import { obtenerUnidadBusqueda } from "@/app/_lib/servicios";
import ListaBusqueda from "./Lista";
import { BusquedaProps } from "@/app/_lib/tipos";

const ListaBusquedaContenedor = async ({ categoriaSlug, marcasSlug, terminoSlug, ordenSlug, esDispositivoMovil = true }: BusquedaProps) => {
  const unidades = await obtenerUnidadBusqueda({ categoriaSlug, marcasSlug, terminoSlug, ordenSlug })();

  if (!unidades?.length) {
    return <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center text-neutral-800 text-2xl">No se encontraron resultados</div>;
  }

  return (
    <ListaBusqueda unidades={unidades || []} esDispositivoMovil={esDispositivoMovil} />
  );
};

export default ListaBusquedaContenedor;
