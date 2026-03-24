import Image from 'next/image';
import estilo from './carruselPrecios.module.css';
import { obtenerPrecios } from '@/app/_lib/servicios';
import { PrecioMercadoTipo } from '@/app/_lib/tipos';

export const revalidate = 3600; // regenerar la página cada 1 hora y guardar en caché

const ICONO: { [key: string]: string } = {
  dolarIcono: 'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrofierros/genericas/dolar.svg',
  sojaIcono: 'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrofierros/genericas/soja.svg',
  maizIcono: 'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrofierros/genericas/maiz.svg',
  trigoIcono: 'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrofierros/genericas/trigo.svg',
}

const PrecioConImagen = ({ precio }: { precio: PrecioMercadoTipo }) => {
  return (
    <>
      <Image loading='lazy' src={ICONO[precio.icono] ?? ICONO.dolarIcono} height={35} width={35} alt='Ícono dólar' />
      <div className="flex flex-col items-start">
        <span className='leading-[18px] font-bold'>{(precio.precio ? Number(precio.precio) : 0).toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })}</span>
        <span className='leading-[18px]'>{precio.nombre}</span>
      </div>
    </>
  );
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
                  <PrecioConImagen precio={p} />
                </div>
              ))
            }
            {
              precios?.map((p: PrecioMercadoTipo, idx) => (
                <div key={`${idx}-bis`} className={estilo.slide}>
                  <PrecioConImagen precio={p} />
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
