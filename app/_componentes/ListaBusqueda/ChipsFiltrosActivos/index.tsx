import Link from "next/link";
import { OPCION_ORDEN_DEFECTO, OPCIONES_ORDEN, URL_PARAMETRO } from "@/app/_lib/constantes";
import { OpcionOrden } from "@/app/_lib/tipos";

const humanizarSlug = (slug: string) =>
  slug.split('-').filter(Boolean).join(' ');

type ChipsFiltrosActivosProps = {
  categoriaSlug: string[],
  marcasSlug: string[],
  terminoSlug: string,
  ordenSlug: string,
};

// Chips de filtros activos con enlace para quitar cada uno (sin JS de cliente).
// Cada chip apunta a la misma búsqueda sin el filtro correspondiente.
const ChipsFiltrosActivos = ({ categoriaSlug, marcasSlug, terminoSlug, ordenSlug }: ChipsFiltrosActivosProps) => {
  const construirUrl = ({ sinCategorias, sinMarcas, sinTermino, sinOrden }: {
    sinCategorias?: string[], sinMarcas?: string[], sinTermino?: boolean, sinOrden?: boolean
  }) => {
    const parametros = new URLSearchParams();

    const categoriasRestantes = sinCategorias
      ? categoriaSlug.filter(cat => !sinCategorias.includes(cat))
      : categoriaSlug;
    categoriasRestantes
      .filter(cat => cat !== 'todas')
      .forEach(cat => parametros.append(URL_PARAMETRO.CATEGORIA, cat));

    const marcasRestantes = sinMarcas
      ? marcasSlug.filter(marca => !sinMarcas.includes(marca))
      : marcasSlug;
    marcasRestantes.forEach(marca => parametros.append(URL_PARAMETRO.MARCA, marca));

    if (terminoSlug && !sinTermino) parametros.set(URL_PARAMETRO.TERMINO, terminoSlug);
    if (ordenSlug && ordenSlug !== OPCION_ORDEN_DEFECTO && !sinOrden) parametros.set(URL_PARAMETRO.ORDEN, ordenSlug);

    const query = parametros.toString();
    return `/buscar${query ? `?${query}` : ''}`;
  };

  const hayTermino = Boolean(terminoSlug?.trim());
  const hayOrden = Boolean(ordenSlug) && ordenSlug !== OPCION_ORDEN_DEFECTO;
  const hayCategorias = categoriaSlug?.length > 0 && !(categoriaSlug.length === 1 && categoriaSlug[0] === 'todas');
  const hayMarcas = marcasSlug?.length > 0;

  if (!hayTermino && !hayOrden && !hayCategorias && !hayMarcas) return null;

  const claseChip = `
    inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1
    text-sm text-neutral-800 hover:border-color-marca hover:text-color-marca
    transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-color-marca
  `;

  return (
    <div className="flex flex-wrap items-center gap-2 w-full">
      {hayCategorias && categoriaSlug.filter(cat => cat !== 'todas').map(cat => (
        <Link key={`cat-${cat}`} href={construirUrl({ sinCategorias: [cat] })} className={claseChip} title={`Quitar categoría ${humanizarSlug(cat)}`}>
          {humanizarSlug(cat)}
          <span aria-hidden="true" className="text-slate-400">✕</span>
        </Link>
      ))}
      {hayMarcas && marcasSlug.map(marca => (
        <Link key={`marca-${marca}`} href={construirUrl({ sinMarcas: [marca] })} className={claseChip} title={`Quitar marca ${humanizarSlug(marca)}`}>
          {humanizarSlug(marca)}
          <span aria-hidden="true" className="text-slate-400">✕</span>
        </Link>
      ))}
      {hayTermino && (
        <Link href={construirUrl({ sinTermino: true })} className={claseChip} title={`Quitar búsqueda "${terminoSlug}"`}>
          “{terminoSlug}”
          <span aria-hidden="true" className="text-slate-400">✕</span>
        </Link>
      )}
      {hayOrden && (
        <Link href={construirUrl({ sinOrden: true })} className={claseChip} title={`Quitar orden ${OPCIONES_ORDEN[ordenSlug as OpcionOrden]}`}>
          Orden: {OPCIONES_ORDEN[ordenSlug as OpcionOrden]}
          <span aria-hidden="true" className="text-slate-400">✕</span>
        </Link>
      )}
      <Link href='/buscar' className={`${claseChip} border-transparent text-color-marca font-semibold hover:bg-marca-50`}>
        Limpiar todo
      </Link>
    </div>
  );
};

export default ChipsFiltrosActivos;
