import ComponenteUnidad from "@/app/_componentes/ComponenteUnidadPagina";
import { Metadata } from "next";

export const revalidate = 7200; // regenerar la página cada 2 horas y guardar en caché

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug

  return {
    alternates: {
      canonical: '/unidad',
    },
    openGraph: {
      title: `AgroFierros | Unidad ${slug}`,
      description: 'Concesionario agrícola: maquinaria nueva y usada, camiones, pick-ups, autos.',
      images: [`https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrofierros/productos/${slug}/1.webp`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `AgroFierros | Unidad ${slug}`,
      description: 'Concesionario agrícola: maquinaria nueva y usada, camiones, pick-ups, autos.',
      creator: '@tisoler',
      images: [`https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrofierros/productos/${slug}/1.webp`],
    },
  }
}

export default async function PaginaUnidad({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <ComponenteUnidad slug={slug} />
  );
};
