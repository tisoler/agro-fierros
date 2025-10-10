import { UnidadConMarcaCategoriaDetallesImagenes } from '@/app/_lib/tipos';
import { UnidadDetalle } from '@/app/_modelos/unidadDetalle';
import IconoHerramientas from '../IconosSvg/Herramientas';
import { WHATSAPP_BOTON_TEXTO, WHATSAPP_MENSAJE_UNIDAD, WHATSAPP_NUMERO } from '@/app/_lib/constantes';
import WhatsAppIcono from '../IconosSvg/WhatsApp/WhatsAppIcono';
import ImagenesDesktop from './ImagenesDesktop';
import ImagenesMobile from './ImagenesMobile';

const Unidad = (
  { unidad, esDispositivoMovil = true }:
  { unidad: UnidadConMarcaCategoriaDetallesImagenes, esDispositivoMovil?: boolean }
) => {
  const mensajeWhatsApp = `${WHATSAPP_MENSAJE_UNIDAD} ${unidad.titulo}.
    https://fabiotommasiagro.com.ar/${unidad.slug}
  `;
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensajeWhatsApp}`;

  return (
    <article className="flex flex-col md:flex-row gap-4 md:gap-8 pt-6 md:pt-12 pb-12 border-b-[1.9px] border-b-neutral-200">
      <ImagenesDesktop unidad={unidad} />
      <section className="flex md:flex-1 flex-col items-start text-neutral-900 gap-1">
        <div className="flex items-center w-full text-neutral-700">
          {
            unidad.categorias?.map((cat, idx) => (
              <div key={cat.id} className='flex items-center'>
                {idx > 0 ? <span className="mx-1">{'|'}</span> : null}
                <a
                  href={`/buscar?categoria=${cat.slug}`}
                  title={cat.descripcion}
                  className="hover:text-color-marca text-lg font-semibold"
                >
                  {cat.descripcion}
                </a>
              </div>
            ))
          }
        </div>
        <h1 className="w-full md:min-h-[72px] text-color-marca text-2xl md:text-3xl font-semibold mt-1 md:mt-0">
          {unidad?.titulo}
        </h1>
        <ImagenesMobile unidad={unidad} esDispositivoMovil={esDispositivoMovil} />
        <div className="flex gap-3 md:mt-4 font-semibold text-neutral-700">
          <div className="border-1 border-neutral-500 px-2 py-1 rounded min-w-[65px]">
            {unidad?.nuevo ? 'NUEVO' : 'USADO'}
          </div>
          <div className="border-1 border-neutral-500 px-2 py-1 rounded min-w-[108px]">
            <p className="">Marca: {unidad?.marca?.nombre}</p>
          </div>
          <div className="border-1 border-neutral-500 px-2 py-1 rounded min-w-[108px]">Modelo: {unidad?.modelo || new Date().getFullYear.toString()}</div>
        </div>
        <ul className='w-full mt-5'>
          <li key='title' className='flex justify-between items-center py-2'>
            <div className='flex gap-1 items-center'>
              <IconoHerramientas />
              <span className='text-base xl:text-lg font-[500]'>Características</span>
            </div>
            <a
              href={whatsappLink}
              title={WHATSAPP_BOTON_TEXTO}
              target="_blank"
              rel="noopener noreferrer"
              className='inline-flex xl:w-[130px] h-[32px] gap-2 items-center rounded border-1 border-color-marca bg-color-marca text-white fill-white text-base lg:text-lg xl:text-xl font-bold hover:bg-white hover:text-color-marca hover:fill-color-marca active:bg-color-marca active:border-color-marca active:text-white active:fill-white px-3 py-[1px] cursor-pointer'
            >
              Consultar <WhatsAppIcono />
            </a>
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
