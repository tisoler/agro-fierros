import ComponenteBuscarPagina from "@/app/_componentes/ComponenteBuscarPagina";
import { Metadata } from "next";
import { headers } from "next/headers";
import { userAgentFromString } from "next/server";

export const revalidate = 3600; // regenerar la página cada 1 hora y guardar en caché

export const metadata: Metadata = {
  alternates: {
    canonical: '/buscar',
  }
};

export default async function PaginaCategoria(
  { searchParams }: 
  { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent');
  const esDispositivoMovil = userAgentFromString(userAgent || undefined)?.device?.type === 'mobile';

  const { categoria, marca, termino, orden } = await searchParams;
  const marcas = typeof marca === 'string' ? [marca] : (Array.isArray(marca) ? marca : []);
  const categorias = typeof categoria === 'string' ? [categoria] : (Array.isArray(categoria) ? categoria : ['todas']);
  const terminoString = typeof termino === 'string' ? termino : (Array.isArray(termino) ? termino[0] : '');
  const ordenString = typeof orden === 'string' ? orden : (Array.isArray(orden) ? orden[0] : '');

  return (
    <ComponenteBuscarPagina
      categoriaSlug={categorias}
      marcasSlug={marcas}
      terminoSlug={terminoString}
      ordenSlug={ordenString}
      esDispositivoMovil={esDispositivoMovil}
    />
  );
}
