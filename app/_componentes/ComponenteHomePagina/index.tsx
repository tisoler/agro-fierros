import { Suspense } from "react";
import { headers } from 'next/headers'
import { userAgentFromString } from 'next/server';
import dynamic from "next/dynamic";
import Carrusel from "../Carrusel";
import CarruselUnidades from "../CarruselUnidades";
import SkeletonCarrusel from "../Skeletons/Carrusel";
import SkeletonCarruselUnidades from "../Skeletons/CarruselUnidades";
import SkeletonListaCategorias from "../Skeletons/ListaCategorias";
import SkeletonCarruselMercadoArgentino from "../Skeletons/CarruselMercadoArgentino";
import SkeletonSubtitulo from "../Skeletons/Subtitulo";
import ContenedorCarruselNovedades from "../CarruselUnidades/Contenedores/Novedades";
import ContenedorCarruselOportunidades from "../CarruselUnidades/Contenedores/Oportunidades";

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
  const headersList = await headers();
  const userAgent = headersList.get('user-agent');
  const esDispositivoMovil = userAgentFromString(userAgent || undefined)?.device?.type === 'mobile';

  const itemsCarruselPrincipal = new Array(4).fill(0).map((_, idx) => ({
    urlImagenDesktop: `https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/productos/producto-destacado-${idx + 1}-desktop.webp`,
    urlImagenMobile: `https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/productos/producto-destacado-${idx + 1}.webp`,
    textoAlt: `Producto destacado ${idx + 1}`,
  }));

  return (
    <section className="flex flex-col bg-white">
      <Suspense fallback={<SkeletonCarrusel />}>
        <Carrusel items={itemsCarruselPrincipal} esDispositivoMovil={esDispositivoMovil} />
      </Suspense>
      <Suspense fallback={<SkeletonCarruselUnidades />}>
        <ContenedorCarruselOportunidades titulo='Oportunidades' esDispositivoMovil={esDispositivoMovil} priorizar={!esDispositivoMovil} />
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
