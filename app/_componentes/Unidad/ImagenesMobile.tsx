import { UnidadConMarcaCategoriaDetallesImagenes } from '@/app/_lib/tipos';
import Carrusel from '../Carrusel';

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
      <div className='flex md:hidden w-full my-4'>
        <Carrusel items={items} autoscroll={false} esDispositivoMovil={esDispositivoMovil} />
      </div>
    </>
  );
};

export default ImagenesMobile;
