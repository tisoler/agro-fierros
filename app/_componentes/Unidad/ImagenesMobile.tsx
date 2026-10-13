import { UnidadConMarcaCategoriaDetallesImagenes } from '@/app/_lib/tipos';
import Carrusel from '../Carrusel';
import CintaVendida from '../CintaVendida';

const ImagenesMobile = (
  { unidad, esDispositivoMovil = true }:
    { unidad: UnidadConMarcaCategoriaDetallesImagenes, esDispositivoMovil?: boolean }
) => {
  // Sin galería se muestra la destacada (igual que en desktop)
  const items = unidad?.imagenes?.length
    ? unidad.imagenes.map(img => ({
      urlImagenDesktop: '',
      urlImagenMobile: img.urlMobile,
      textoAlt: img.textoAlt,
    }))
    : [{
      urlImagenDesktop: '',
      urlImagenMobile: unidad.imagenDestacadaUrl,
      textoAlt: unidad.imagenDestacadaTextoAlt || unidad.titulo,
    }];

  return (
    <>
      <div className='flex md:hidden relative w-full my-4 overflow-hidden rounded-card'>
        <div className='flex md:hidden w-full'>
          <Carrusel items={items} autoscroll={false} esDispositivoMovil={esDispositivoMovil} />
        </div>
        {unidad?.vendida && <CintaVendida tamanio="grande" />}
      </div>
    </>
  );
};

export default ImagenesMobile;
