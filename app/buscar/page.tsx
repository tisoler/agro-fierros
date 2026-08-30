import ComponenteBuscarPagina from "@/app/_componentes/ComponenteBuscarPagina";
import { Metadata } from "next";

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
  // Sin detección de user-agent (headers()): mantiene la página cacheable.
  // La adaptación mobile/desktop se resuelve con CSS.
  const { categoria, marca, termino, orden, pagina } = await searchParams;
  const marcas = typeof marca === 'string' ? [marca] : (Array.isArray(marca) ? marca : []);
  const categorias = typeof categoria === 'string' ? [categoria] : (Array.isArray(categoria) ? categoria : ['todas']);
  const terminoString = typeof termino === 'string' ? termino : (Array.isArray(termino) ? termino[0] : '');
  const ordenString = typeof orden === 'string' ? orden : (Array.isArray(orden) ? orden[0] : '');
  const paginaString = typeof pagina === 'string' ? pagina : (Array.isArray(pagina) ? pagina[0] : '');
  const paginaNumero = Number.parseInt(paginaString || '1', 10);

  return (
    <ComponenteBuscarPagina
      categoriaSlug={categorias}
      marcasSlug={marcas}
      terminoSlug={terminoString}
      ordenSlug={ordenString}
      pagina={Number.isNaN(paginaNumero) || paginaNumero < 1 ? 1 : paginaNumero}
    />
  );
}
