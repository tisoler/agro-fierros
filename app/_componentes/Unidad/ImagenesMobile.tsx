import { UnidadConMarcaCategoriaDetallesImagenes } from '@/app/_lib/tipos';
import Carrusel from '../Carrusel';
import CintaVendida from '../CintaVendida';

const ImagenesMobile = (
  { unidad, esDispositivoMovil = true }: 
  { unidad: UnidadConMarcaCategoriaDetallesImagenes, esDispositivoMovil?: boolean }
)=> {
  const items = unidad?.imagenes?.map(img => ({
    urlImagenDesktop: '',
    urlImagenMobile: img.urlMobile,
    textoAlt: img.textoAlt,
  })) || [];

  return (
    <>
      <div className='relative w-full my-4 overflow-hidden rounded-card'>
        <div className='flex md:hidden w-full'>
          <Carrusel items={items} autoscroll={false} esDispositivoMovil={esDispositivoMovil} />
        </div>
        {unidad?.vendida && <CintaVendida tamanio="grande" />}
      </div>
    </>
  );
};

export default ImagenesMobile;
