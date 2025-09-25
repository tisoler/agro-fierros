'use client';
import { UnidadConMarcaCategoriaDetallesImagenes } from '@/app/_lib/tipos';
import Image from 'next/image';
import { useState } from 'react';

const ImagenesDesktop = ({ unidad }: { unidad: UnidadConMarcaCategoriaDetallesImagenes }) => {
  const [imagenPrimerPlano, setImagenPrimerPlano] = useState<number>(0);

  return (
    <div className='hidden md:flex gap-2'>
      <div className='flex flex-col gap-2'>
        {
          unidad?.imagenes?.map((imagen, idx) => (
            <picture key={imagen.id}>
              <source
                media="(min-width: 768px)"
                srcSet={imagen.urlMini}
              ></source>
              <source media="(max-width: 767px)" srcSet=""></source>
              <Image
                alt={imagen.textoAlt}
                width={90}
                height={90}
                src='https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/transparente-chica.svg'
                className={`cursor-pointer rounded ${imagenPrimerPlano === idx ? 'border-2 border-color-marca' : ''} hover:border-2 hover:border-color-marca`}
                onClick={() => setImagenPrimerPlano(idx)}
              />
            </picture>
          ))
        }
      </div>
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet={unidad.imagenes?.[imagenPrimerPlano] ? unidad.imagenes[imagenPrimerPlano].urlEscritorio : unidad.imagenDestacadaUrl}
        ></source>
        <source media="(max-width: 767px)" srcSet=""></source>
        <Image
          loading='eager'
          priority
          src="https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/transparente-chica.svg"
          alt={unidad?.titulo || 'Unidad'}
          height={490}
          width={640}
          className="w-[640px] h-[490px] object-cover object-center"
          quality={85} // Optimización de calidad
        />
      </picture>
    </div>
  );
};

export default ImagenesDesktop;
