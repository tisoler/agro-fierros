import CarruselUnidades from "../CarruselUnidades";
import { Suspense } from "react";
import SkeletonCarruselUnidades from "../Skeletons/CarruselUnidades";
import Unidad from "../Unidad";
import SkeletonUnidadDetalle from "../Skeletons/UnidadDetalle";

export default async function ComponenteUnidad({ slug }: { slug: string }) {

  return (
    <div className="flex flex-col items-center bg-color-fondo-gris pt-4 md:pt-8 pb-12">
      <Suspense fallback={<SkeletonUnidadDetalle />}>
        <Unidad slug={slug} />
      </Suspense>
      <div className="flex flex-col max-w-[1200px] w-full bg-white px-2 md:px-8">
        <Suspense fallback={<SkeletonCarruselUnidades variante='chico' />}>
          <CarruselUnidades titulo='Unidades que te pueden interesar' tipo='oportunidades' variante='chico' />
        </Suspense>
      </div>
    </div>
  );
};
