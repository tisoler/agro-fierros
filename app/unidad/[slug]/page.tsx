import ComponenteUnidad from "@/app/_componentes/ComponenteUnidadPagina";
import { obtenerUnidadPorSlug } from "@/app/_lib/servicios";
import { Metadata } from "next";

export const revalidate = 7200; // regenerar la página cada 2 horas y guardar en caché

type Props = {
  params: Promise<{ slug: string }>
}

const DESCRIPCION_DEFECTO = 'Portal de venta de maquinaria agrícola nueva y usada, camiones, pick-ups y autos en la zona centro de Argentina.';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const unidad = await obtenerUnidadPorSlug(slug)();

  // Fallback ante unidad inexistente/inactiva: metadata genérica
  if (!unidad) {
    return {
      title: 'Unidad no encontrada',
      alternates: {
        canonical: `/unidad/${slug}`,
      },
    };
  }

  const titulo = `${unidad.titulo}${unidad.marca?.nombre ? ` - ${unidad.marca.nombre}` : ''}`;
  const descripcion = unidad.descripcion?.trim() || DESCRIPCION_DEFECTO;
  const imagen = unidad.imagenDestacadaUrl ||
    `https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrofierros/productos/${slug}/1.webp`;

  return {
    title: titulo,
    description: descripcion,
    alternates: {
      canonical: `/unidad/${slug}`,
    },
    openGraph: {
      title: `${titulo} | AgroFierros`,
      description: descripcion,
      images: [imagen],
      type: 'article',
      locale: 'es_AR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${titulo} | AgroFierros`,
      description: descripcion,
      creator: '@tisoler',
      images: [imagen],
    },
  };
}

export default async function PaginaUnidad({ params }: Props) {
  const { slug } = await params;

  // Datos estructurados para buscadores (Product + Offer + breadcrumb).
  // Se usa el mismo servicio cacheado que renderiza la página.
  const unidad = await obtenerUnidadPorSlug(slug)();
  const jsonLd = unidad ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: unidad.titulo,
    description: unidad.descripcion || DESCRIPCION_DEFECTO,
    image: unidad.imagenDestacadaUrl,
    brand: unidad.marca?.nombre ? {
      '@type': 'Brand',
      name: unidad.marca.nombre,
    } : undefined,
    category: unidad.categorias?.[0]?.descripcion || undefined,
    offers: {
      '@type': 'Offer',
      url: `https://agrofierros.com.ar/unidad/${slug}`,
      availability: unidad.vendida
        ? 'https://schema.org/SoldOut'
        : 'https://schema.org/InStock',
      // El precio se publica solo si la unidad lo tiene cargado
      ...(unidad.precioDolar != null
        ? { priceCurrency: 'USD', price: unidad.precioDolar }
        : { priceCurrency: 'ARS' }),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://agrofierros.com.ar' },
        ...(unidad.categorias?.[0] ? [{
          '@type': 'ListItem',
          position: 2,
          name: unidad.categorias[0].descripcion,
          item: `https://agrofierros.com.ar/buscar?categoria=${unidad.categorias[0].slug}`,
        }] : []),
        { '@type': 'ListItem', position: unidad.categorias?.[0] ? 3 : 2, name: unidad.titulo },
      ],
    },
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ComponenteUnidad slug={slug} />
    </>
  );
};
