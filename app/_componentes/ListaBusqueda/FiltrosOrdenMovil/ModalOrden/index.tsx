'use client';
import { OPCION_ORDEN_DEFECTO, OPCIONES_ORDEN, URL_PARAMETRO } from "@/app/_lib/constantes";
import { OpcionOrden } from "@/app/_lib/tipos";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ModalOrdenMovil = ({ ordenSlug }: { ordenSlug: string }) => {
  const router = useRouter();
  const queryString = useSearchParams();
  const path = usePathname();

  const cerrarFiltros = () => {
    // Evitar en el server
    if (!window) return;

    // Usamos JS y CSS porque no es posible manejarlo con un state de manera individual (categorías y marcas)
    // El div contenedor necesita estar en un server component app/_componentes/ListaBusqueda/FiltrosOrdenMovil/index.tsx y por tanto no puede acceder a un global state (Context API)
    // De mover el contenedor hacia adentro, debería colocarse en eun solo Suspense y el filtro de marcas bloquearía y redibujaría el de categorías
    const contenedor = document.getElementById('contenedorOrdenMovil');
    if (!contenedor?.style) return;
    contenedor.style.display = 'none';
  }

  const manejarSeleccionarOpcion = async (opcion: OpcionOrden) => {
    const parametros = new URLSearchParams(queryString);
    if (ordenSlug !== opcion && opcion !== OPCION_ORDEN_DEFECTO) {
      parametros.set(URL_PARAMETRO.ORDEN, opcion);
    } else {
      parametros.delete(URL_PARAMETRO.ORDEN);
    }
    
    const nuevoPath = path + '?' + parametros.toString();
    router.push(nuevoPath);
    // delay antes de cerrar
    await new Promise(resolve => setTimeout(() => resolve(true), 400));
    cerrarFiltros();
  };

  return (
    <section id='contenedorOrdenMovil' role='dialog' className="hidden flex-col h- gap-3 fixed z-50 top-0 left-0 w-full h-full py-6 px-3 bg-black/30 bg-white text-neutral-800">
      <div className="flex justify-between">
        <div className="w-fit flex">
          <button
            aria-label="Cerrar filtros"
            title="Cerrar filtros"
            className="flex justify-center items-center w-[38px] h-[38px] rounded-full active:bg-neutral-300 active:text-white"
            onClick={cerrarFiltros}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <h2 className="text-2xl font-semibold text-center">Ordenar por:</h2>
        <div className="w-[38px]"></div>
      </div>
      <ul className="flex flex-col text-xl bg-color-fondo-gris">
        {
          Object.entries(OPCIONES_ORDEN)?.map(claveValor =>
            <li key={claveValor[0]} className="flex flex-col items-center" onClick={() => manejarSeleccionarOpcion(claveValor[0] as OpcionOrden)}>
              <hr className="border-t-1 border-t-neutral-300 w-full"></hr>
              <span
                className={`
                  flex items-center w-full gap-2 cursor-pointer active:bg-neutral-200 px-2 py-2 text-lg 
                  ${ordenSlug === claveValor[0] || !ordenSlug && claveValor[0] === OPCION_ORDEN_DEFECTO ? 'border-l-5 border-l-color-marca bg-neutral-200' : ''}
                `}
              >
                {claveValor[1]}
              </span>
            </li>
          )
        }
      </ul>
    </section>
  )
};

export default ModalOrdenMovil;
