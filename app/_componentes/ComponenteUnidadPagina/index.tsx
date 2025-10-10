import { Suspense } from "react";
import Unidad from "../Unidad";
import SkeletonUnidadDetalle from "../Skeletons/UnidadDetalle";
import { headers } from "next/headers";
import { userAgentFromString } from "next/server";

export default async function ComponenteUnidad({ slug }: { slug: string }) {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent');
  const esDispositivoMovil = userAgentFromString(userAgent || undefined)?.device?.type === 'mobile';

  return (
    <div className="flex flex-col items-center bg-color-fondo-gris pt-4 md:pt-8 pb-12">
      <Suspense fallback={<SkeletonUnidadDetalle />}>
        <Unidad slug={slug} esDispositivoMovil={esDispositivoMovil} />
      </Suspense>
    </div>
  );
};
