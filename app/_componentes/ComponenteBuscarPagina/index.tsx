import { BusquedaProps } from "@/app/_lib/tipos";
import PanelListaBusqueda from "../ListaBusqueda";
import FiltrosOrdenEscritorio from "../ListaBusqueda/FiltrosOrdenEscritorio";
import FiltrosOrdenMovil from "../ListaBusqueda/FiltrosOrdenMovil";
import ProveedorMarcas from "@/app/_hooks/contextoMarcas";

export default async function ComponenteBuscar({ categoriaSlug, marcasSlug, terminoSlug, ordenSlug, esDispositivoMovil = true }: BusquedaProps) {
  const idMarcasSlug = marcasSlug?.length > 0 ?  marcasSlug.sort((a, b) => a.localeCompare(b))?.join('&') : 'todas';
  const idCategoriasSlug = categoriaSlug?.length > 0 ?  categoriaSlug.sort((a, b) => a.localeCompare(b))?.join('&') : 'todas'

  return (
    <div className="flex flex-col items-center bg-color-fondo-gris px-1 md:px-2 pt-4 md:pt-8 pb-12 gap-2">
      <ProveedorMarcas>
        <FiltrosOrdenMovil
          categoriaSlug={categoriaSlug}
          marcasSlug={marcasSlug}
          ordenSlug={ordenSlug}
          idCategoriasSlug={idCategoriasSlug}
          idMarcasSlug={idMarcasSlug}
        />
        <div className="flex w-full md:w-[calc(100%-6rem)] px-1 md:px-6 py-3 md:bg-white gap-0 md:gap-6">
          <FiltrosOrdenEscritorio
            categoriaSlug={categoriaSlug}
            marcasSlug={marcasSlug}
            idCategoriasSlug={idCategoriasSlug}
          />
          <PanelListaBusqueda
            categoriaSlug={categoriaSlug}
            marcasSlug={marcasSlug}
            terminoSlug={terminoSlug}
            ordenSlug={ordenSlug}
            idCategoriasSlug={idCategoriasSlug}
            idMarcasSlug={idMarcasSlug}
            esDispositivoMovil={esDispositivoMovil}
          />
        </div>
      </ProveedorMarcas>
    </div>
  );
};
