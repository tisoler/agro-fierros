import { Suspense } from "react";
import Unidad from "../Unidad";
import SkeletonUnidadDetalle from "../Skeletons/UnidadDetalle";

export default function ComponenteUnidad({ slug }: { slug: string }) {
  // Sin detección de user-agent (headers()): mantiene la página como estática/ISR.
  // La galería mobile/desktop se alterna por CSS.
  return (
    <>
      <div aria-hidden className="h-2 w-full bg-color-marca" />
      <div className="flex flex-col items-center bg-color-fondo-gris pt-4 md:pt-8 pb-12">
        <Suspense fallback={<SkeletonUnidadDetalle />}>
          <Unidad slug={slug} />
        </Suspense>
      </div>
    </>
  );
};
