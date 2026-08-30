import { UnidadConMarcaCategoriaDetallesImagenes } from '@/app/_lib/tipos';
import { UnidadDetalle } from '@/app/_modelos/unidadDetalle';
import { formatearPrecioDolar } from '@/app/_lib/utilidades';
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
    https://agrofierros.com.ar/${unidad.slug}
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
        {/* Precio en dólares (solo si tiene) */}
        {unidad?.precioDolar != null && (
          <p className="w-full text-2xl md:text-3xl font-bold text-slate-900 mt-1">
            {formatearPrecioDolar(unidad.precioDolar)}
          </p>
        )}
        <ImagenesMobile unidad={unidad} esDispositivoMovil={esDispositivoMovil} />
        <div className="flex flex-wrap gap-2 md:mt-4 font-semibold text-neutral-700">
          <div className={`rounded-full px-3 py-1 text-sm font-bold text-white ${unidad?.nuevo ? 'bg-estado-nueva' : 'bg-estado-usada'}`}>
            {unidad?.nuevo ? 'NUEVO' : 'USADO'}
          </div>
          <div className="rounded-btn border border-slate-300 bg-white px-2.5 py-1 text-sm">
            Marca: {unidad?.marca?.nombre}
          </div>
          <div className="rounded-btn border border-slate-300 bg-white px-2.5 py-1 text-sm">Modelo: {unidad?.modelo || new Date().getFullYear().toString()}</div>
          {unidad?.esOportunidad && (
            <div className="rounded-full px-3 py-1 text-sm font-bold text-white bg-estado-oportunidad">
              OPORTUNIDAD
            </div>
          )}
        </div>
        <ul className='w-full mt-5'>
          <li key='title' className='flex justify-between items-center py-2'>
            <div className='flex gap-1 items-center'>
              <IconoHerramientas />
              <span className='text-lg font-[500]'>Características</span>
            </div>
            <a
              href={whatsappLink}
              title={WHATSAPP_BOTON_TEXTO}
              target="_blank"
              rel="noopener noreferrer"
              className='inline-flex xl:w-[130px] h-[36px] gap-2 items-center rounded-btn border border-color-marca bg-color-marca text-white fill-white text-lg font-bold hover:bg-marca-500 hover:border-marca-500 active:bg-marca-700 active:border-marca-700 px-3 py-[1px] cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-color-marca focus-visible:ring-offset-1'
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
