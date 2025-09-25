import { UnidadConMarcaCategoriaDetallesImagenes } from '@/app/_lib/tipos';
import { UnidadDetalle } from '@/app/_modelos/unidadDetalle';
import IconoHerramientas from '../IconosSvg/Herramientas';
import { WHATSAPP_BOTON_TEXTO, WHATSAPP_MENSAJE_UNIDAD, WHATSAPP_NUMERO } from '@/app/_lib/constantes';
import WhatsAppIcono from '../IconosSvg/WhatsApp/WhatsAppIcono';
import ImagenesDesktop from './ImagenesDesktop';
import ImagenesMobile from './ImagenesMobile';

const Unidad = ({ unidad }: { unidad: UnidadConMarcaCategoriaDetallesImagenes }) => {
  const mensajeWhatsApp = `${WHATSAPP_MENSAJE_UNIDAD} ${unidad.titulo}.
    https://fabiotommasiagro.com.ar/${unidad.slug}
  `;
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensajeWhatsApp}`;

  return (
    <article className="flex flex-col md:flex-row gap-4 md:gap-8 pt-6 md:pt-12 pb-12 border-b-[1.9px] border-b-neutral-200">
      <ImagenesDesktop unidad={unidad} />
      <section className="flex md:flex-1 flex-col items-start text-black gap-1">
        <p className="flex justify-between items-center w-full text-xl font-semibold text-neutral-700 text-center md:text-left">
          {unidad?.categoria?.titulo}
          <a
            href={whatsappLink}
            title={WHATSAPP_BOTON_TEXTO}
            target="_blank"
            rel="noopener noreferrer"
            className='inline-flex w-[130px] h-[32px] gap-2 items-center rounded border-1 border-green-700 text-green-700 fill-green-700 text-xl hover:bg-green-700 hover:border-white hover:text-white hover:fill-white active:bg-white active:border-green-700 active:text-green-700 active:fill-green-700 px-3 py-[1px] cursor-pointer'
          >
            Consultar <WhatsAppIcono />
          </a>
        </p>
        <h1 className="w-full md:min-h-[72px] text-color-marca text-2xl md:text-3xl font-semibold mt-1 md:mt-0">
          {unidad?.titulo}
        </h1>
        <ImagenesMobile unidad={unidad} />
        <div className="flex gap-3 md:mt-4 font-semibold">
          <div className="border-1 border-neutral-500 px-2 py-1 rounded min-w-[65px]">
            {unidad?.nuevo ? 'NUEVO' : 'USADO'}
          </div>
          <div className="border-1 border-neutral-500 px-2 py-1 rounded min-w-[108px]">
            <p className="">Marca: {unidad?.marca?.nombre}</p>
          </div>
          <div className="border-1 border-neutral-500 px-2 py-1 rounded min-w-[108px]">Modelo: {unidad?.modelo}</div>
        </div>
        <ul className='w-full mt-5'>
          <li key='title' className='flex gap-1 items-center py-2'>
            <IconoHerramientas />
            <span className='text-lg font-[500]'>Características técnicas</span>
          </li>
          {
            unidad?.detalles?.map((det: UnidadDetalle, idx) => (
              <li key={det.id} className={`pl-3 py-2 border-b-1 border-b-neutral-200 ${idx % 2 === 0 ? 'bg-neutral-100' : 'bg-white'}`}>
                {det.detalle.slice(0, 1) + det.detalle?.slice(1)?.toLowerCase()}
              </li>
            ))
          }
        </ul>
      </section>
    </article>
  );
};

export default Unidad;
