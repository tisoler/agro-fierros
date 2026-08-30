import { Suspense } from "react";
import dynamic from "next/dynamic";
import Carrusel from "../Carrusel";
import SkeletonCarrusel from "../Skeletons/Carrusel";
import SkeletonCarruselUnidades from "../Skeletons/CarruselUnidades";
import SkeletonListaCategorias from "../Skeletons/ListaCategorias";
import SkeletonCarruselMercadoArgentino from "../Skeletons/CarruselMercadoArgentino";
import SkeletonSubtitulo from "../Skeletons/Subtitulo";
import ContenedorCarruselNovedades from "../CarruselUnidades/Contenedores/Novedades";
import ContenedorCarruselOportunidades from "../CarruselUnidades/Contenedores/Oportunidades";
import { obtenerCarruselHome } from "@/app/_lib/servicios";

// Carga diferida del componente que no es crítico
const SubtituloDinamico = dynamic(() => import('../Subtitulo/subtitulo'), {
  loading: () => <SkeletonSubtitulo />
});
const ListaCategorias = dynamic(() => import('../ListaCategorias'), {
  loading: () => <SkeletonListaCategorias />
});
const CarruselMercadoArgentino = dynamic(() => import('../CarruselPrecios/carruselPrecios'), {
  loading: () => <SkeletonCarruselMercadoArgentino />
});
const PlacaVenta = dynamic(() => import('../PlacaVenta'));

const ComponenteHome = async () => {
  // Sin detección de user-agent (headers()): mantiene la página como estática/ISR.
  // Las imágenes se adaptan por CSS/media queries.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AgroFierros',
    url: 'https://agrofierros.com.ar',
    logo: 'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrofierros/genericas/logo.svg',
    description: 'Portal de venta de maquinaria agrícola nueva y usada en la zona centro de Argentina.',
    areaServed: 'Argentina',
  };

  const itemsCarruselDefecto = new Array(4).fill(0).map((_, idx) => ({
    urlImagenDesktop: `https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrofierros/productos/producto-destacado-${idx + 1}-desktop.webp`,
    urlImagenMobile: `https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrofierros/productos/producto-destacado-${idx + 1}.webp`,
    textoAlt: `Producto destacado ${idx + 1}`,
  }));

  // El carrusel principal se gestiona desde el admin (tabla carruselHome);
  // si no hay items activos se usa el hardcode histórico como fallback.
  const itemsCarruselBD = await obtenerCarruselHome();
  const itemsCarruselPrincipal = itemsCarruselBD.length
    ? itemsCarruselBD.map(item => ({
        urlImagenDesktop: item.urlImagenDesktop,
        urlImagenMobile: item.urlImagenMobile,
        textoAlt: item.textoAlt,
        urlDestino: item.urlDestino || undefined,
      }))
    : itemsCarruselDefecto;

  return (
    <section className="flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<SkeletonCarrusel />}>
        <Carrusel items={itemsCarruselPrincipal} />
      </Suspense>
      <Suspense fallback={<SkeletonCarruselUnidades />}>
        <ContenedorCarruselOportunidades titulo='Oportunidades' priorizar />
      </Suspense>
      <SubtituloDinamico />
      <ListaCategorias />
      <div className="relative flex w-full justify-center">
        <CarruselMercadoArgentino />
      </div>
      <div className="mt-8 md:mt-0">
        <Suspense fallback={<SkeletonCarruselUnidades />}>
          {/* Usamos Suspense porque arriba ya lo usamos, no conviene duplicar el componente usando dynamic acá porque lo duplicaría en el bundle */}
          <ContenedorCarruselNovedades titulo='Novedades' />
        </Suspense>
      </div>
      <PlacaVenta />
    </section>
  );
}

export default ComponenteHome;
