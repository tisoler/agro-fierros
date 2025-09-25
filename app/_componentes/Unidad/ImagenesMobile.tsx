import { UnidadConMarcaCategoriaDetallesImagenes } from '@/app/_lib/tipos';
import Carrusel from '../Carrusel';

const ImagenesMobile = ({ unidad }: { unidad: UnidadConMarcaCategoriaDetallesImagenes }) => {
  const items = unidad?.imagenes?.map(img => ({
    urlImagenDesktop: '',
    urlImagenMobile: img.urlMobile,
    textoAlt: img.textoAlt,
  })) || [];

  return (
    <>
      <div className='flex md:hidden w-full my-4'>
        <Carrusel items={items} autoscroll={false} />
      </div>
    </>
  );
};

export default ImagenesMobile;
