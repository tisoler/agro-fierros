import Link from "next/link";
import { obtenerUnidadBusqueda } from "@/app/_lib/servicios";
import ListaBusqueda from "./Lista";
import { BusquedaProps } from "@/app/_lib/tipos";
import { OPCION_ORDEN_DEFECTO, UNIDADES_POR_PAGINA, URL_PARAMETRO } from "@/app/_lib/constantes";

// Reconstruye la URL de búsqueda actual cambiando solo la página.
const construirUrlPagina = ({ categoriaSlug, marcasSlug, terminoSlug, ordenSlug }: BusquedaProps, pagina: number) => {
  const parametros = new URLSearchParams();
  categoriaSlug?.filter(cat => cat !== 'todas').forEach(cat => parametros.append(URL_PARAMETRO.CATEGORIA, cat));
  marcasSlug?.forEach(marca => parametros.append(URL_PARAMETRO.MARCA, marca));
  if (terminoSlug?.trim()) parametros.set(URL_PARAMETRO.TERMINO, terminoSlug);
  if (ordenSlug && ordenSlug !== OPCION_ORDEN_DEFECTO) parametros.set(URL_PARAMETRO.ORDEN, ordenSlug);
  if (pagina > 1) parametros.set(URL_PARAMETRO.PAGINA, pagina.toString());

  const query = parametros.toString();
  return `/buscar${query ? `?${query}` : ''}`;
};

const ListaBusquedaContenedor = async ({ categoriaSlug, marcasSlug, terminoSlug, ordenSlug, esDispositivoMovil = true, pagina = 1 }: BusquedaProps) => {
  const resultado = await obtenerUnidadBusqueda({ categoriaSlug, marcasSlug, terminoSlug, ordenSlug })();
  const unidades = resultado?.unidadesFiltradas || [];

  if (!unidades.length) {
    return (
      <div className="absolute top-0 left-0 flex flex-col gap-4 items-center justify-center h-full w-full text-center px-4">
        <p className="text-neutral-800 text-xl md:text-2xl font-semibold">No se encontraron resultados</p>
        <p className="text-slate-500 text-sm md:text-base">Probá quitando algún filtro o usando otro término de búsqueda.</p>
        <Link
          href='/buscar'
          className="rounded-btn bg-color-marca hover:bg-marca-500 active:bg-marca-700 text-white text-sm font-semibold px-4 py-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-color-marca focus-visible:ring-offset-1"
        >
          Limpiar filtros
        </Link>
      </div>
    );
  }

  // Paginación server-side con corte configurable (UNIDADES_POR_PAGINA).
  const totalPaginas = Math.ceil(unidades.length / UNIDADES_POR_PAGINA);
  const paginaActual = Math.min(Math.max(pagina, 1), totalPaginas);
  const unidadesPagina = unidades.slice((paginaActual - 1) * UNIDADES_POR_PAGINA, paginaActual * UNIDADES_POR_PAGINA);

  return (
    <>
      <div className="col-span-full w-full text-sm text-slate-500">
        {unidades.length} {unidades.length === 1 ? 'unidad encontrada' : 'unidades encontradas'}
      </div>
      <ListaBusqueda unidades={unidadesPagina} marcas={resultado?.marcasFiltradas || []} esDispositivoMovil={esDispositivoMovil} />
      {totalPaginas > 1 && (
        <nav className="col-span-full w-full flex items-center justify-center gap-3 pt-4" aria-label="Paginación de resultados">
          {paginaActual > 1 ? (
            <Link
              href={construirUrlPagina({ categoriaSlug, marcasSlug, terminoSlug, ordenSlug }, paginaActual - 1)}
              className="rounded-btn border border-slate-300 bg-white hover:border-color-marca hover:text-color-marca px-3 py-1.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-color-marca"
            >
              Anterior
            </Link>
          ) : (
            <span className="rounded-btn border border-slate-200 bg-white text-slate-300 px-3 py-1.5 text-sm font-semibold cursor-not-allowed" aria-disabled="true">
              Anterior
            </span>
          )}
          <span className="text-sm text-neutral-700">Página {paginaActual} de {totalPaginas}</span>
          {paginaActual < totalPaginas ? (
            <Link
              href={construirUrlPagina({ categoriaSlug, marcasSlug, terminoSlug, ordenSlug }, paginaActual + 1)}
              className="rounded-btn border border-slate-300 bg-white hover:border-color-marca hover:text-color-marca px-3 py-1.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-color-marca"
            >
              Siguiente
            </Link>
          ) : (
            <span className="rounded-btn border border-slate-200 bg-white text-slate-300 px-3 py-1.5 text-sm font-semibold cursor-not-allowed" aria-disabled="true">
              Siguiente
            </span>
          )}
        </nav>
      )}
    </>
  );
};

export default ListaBusquedaContenedor;
