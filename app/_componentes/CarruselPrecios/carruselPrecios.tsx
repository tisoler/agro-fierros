import Image from 'next/image';
import estilo from './carruselPrecios.module.css';
import { obtenerPrecios } from '@/app/_lib/servicios';
import { PrecioMercadoTipo } from '@/app/_lib/tipos';

export const revalidate = 3600; // regenerar la página cada 1 hora y guardar en caché

const ICONO: { [key: string]: string } = {
  dolarIcono: 'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/dolar.svg',
  sojaIcono: 'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/soja.svg',
  maizIcono: 'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/maiz.svg',
  trigoIcono: 'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/trigo.svg',
}

const CarruselMercadoArgentino = async () => {
  const precios = await obtenerPrecios();

  return (
    <div className={`w-[90vw] md:w-[750px] mx-auto overflow-hidden rounded-lg ${estilo.sliderContenedor} mb-5 absolute top-[-35px] z-40 bg-white`}>
      <div className={estilo.slider}>
        {
          <>
            {
              precios?.map((p: PrecioMercadoTipo, idx) => (
                <div key={idx} className={estilo.slide}>
                  <Image loading='lazy' className='mb-1' src={ICONO[p.icono] ?? ICONO.dolarIcono} height={30} width={30} alt='Ícono dólar'/>
                  <div className="flex flex-col items-start leading-5">
                    <span>${p.precio?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
                    <span className='font-bold'>{p.nombre}</span>
                  </div>
                </div>
              ))
            }
            {
              precios?.map((p: PrecioMercadoTipo, idx) => (
                <div key={`${idx}-bis`} className={estilo.slide}>
                  <Image loading='lazy' className='mb-1' src={ICONO[p.icono] ?? ICONO.dolarIcono} height={30} width={30} alt='Ícono dólar'/>
                  <div className="flex flex-col items-start leading-5">
                    <span>${p.precio?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
                    <span className='font-bold'>{p.nombre}</span>
                  </div>
                </div>
              ))
            }
          </>
        }
      </div>
    </div>
  );
};

export default CarruselMercadoArgentino;
