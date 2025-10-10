import ComponenteUnidad from "@/app/_componentes/ComponenteUnidadPagina";
import { Metadata } from "next";

export const revalidate = 7200; // regenerar la página cada 2 horas y guardar en caché

export const metadata: Metadata = {
  alternates: {
    canonical: '/unidad',
  }
};

export default async function PaginaUnidad({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <ComponenteUnidad slug={slug} />
  );
};
