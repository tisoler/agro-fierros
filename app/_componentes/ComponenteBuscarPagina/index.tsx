import { BusquedaProps } from "@/app/_lib/tipos";
import PanelListaBusqueda from "../ListaBusqueda";
import ChipsFiltrosActivos from "../ListaBusqueda/ChipsFiltrosActivos";
import FiltrosOrdenEscritorio from "../ListaBusqueda/FiltrosOrdenEscritorio";
import FiltrosOrdenMovil from "../ListaBusqueda/FiltrosOrdenMovil";
import ProveedorMarcas from "@/app/_hooks/contextoMarcas";

export default async function ComponenteBuscar({ categoriaSlug, marcasSlug, terminoSlug, ordenSlug, esDispositivoMovil = true, pagina = 1 }: BusquedaProps) {
  const idMarcasSlug = marcasSlug?.length > 0 ?  marcasSlug.sort((a, b) => a.localeCompare(b))?.join('&') : 'todas';
  const idCategoriasSlug = categoriaSlug?.length > 0 ?  categoriaSlug.sort((a, b) => a.localeCompare(b))?.join('&') : 'todas'

  // Datos estructurados para buscadores (colección + breadcrumb)
  const jsonLd = [{
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Buscar maquinaria agrícola',
    url: 'https://agrofierros.com.ar/buscar',
    description: 'Buscador de maquinaria agrícola nueva y usada: filtrá por categoría, marca, término de búsqueda u orden.',
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://agrofierros.com.ar' },
      { '@type': 'ListItem', position: 2, name: 'Buscar', item: 'https://agrofierros.com.ar/buscar' },
    ],
  }];

  return (
    <div className="flex flex-col items-center bg-color-fondo-gris px-1 md:px-2 pt-4 md:pt-8 pb-12 gap-2">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          <div className="flex flex-col w-full gap-3">
            <ChipsFiltrosActivos
              categoriaSlug={categoriaSlug}
              marcasSlug={marcasSlug}
              terminoSlug={terminoSlug}
              ordenSlug={ordenSlug}
            />
            <PanelListaBusqueda
              categoriaSlug={categoriaSlug}
              marcasSlug={marcasSlug}
              terminoSlug={terminoSlug}
              ordenSlug={ordenSlug}
              idCategoriasSlug={idCategoriasSlug}
              idMarcasSlug={idMarcasSlug}
              esDispositivoMovil={esDispositivoMovil}
              pagina={pagina}
            />
          </div>
        </div>
      </ProveedorMarcas>
    </div>
  );
};
