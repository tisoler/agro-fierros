'use client';
import { OPCION_ORDEN_DEFECTO, OPCIONES_ORDEN, URL_PARAMETRO } from "@/app/_lib/constantes";
import { OpcionOrden } from "@/app/_lib/tipos";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ListaDesplegableOrden = ({ ordenSlug }: { ordenSlug: string }) => {
  const [mostrarOpciones, setMostrarOpciones] = useState<boolean>(false);

  const router = useRouter();
  const queryString = useSearchParams();
  const path = usePathname();

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
    setMostrarOpciones(false);
  };

  return (
    <div className="hidden md:flex relative items-center h-[28px] text-neutral-800 text-lg gap-2 w-[215px]">
      Ordenado por:
      <div className="cursor-pointer hover:text-color-marca" onClick={() => setMostrarOpciones(true)}>
        {OPCIONES_ORDEN[ordenSlug as OpcionOrden || OPCION_ORDEN_DEFECTO]}
      </div>
      <ul className={`${mostrarOpciones ? 'flex' : 'hidden'} flex-col absolute bg-color-fondo-gris w-full z-40 top-[29px] p-1 rounded`}>
        {
          Object.entries(OPCIONES_ORDEN)?.map((claveValor, idx) => (
            <li key={claveValor[0]} className="cursor-pointer hover:bg-neutral-300" onClick={() => manejarSeleccionarOpcion(claveValor[0] as OpcionOrden)}>
              { idx > 0 && <hr className="border-t-1 border-t-neutral-300 w-[98%]"></hr> }
              <span
                className={`flex items-center w-full gap-2 cursor-pointer active:bg-neutral-200 px-2 py-1 text-lg ${ordenSlug === claveValor[0] ? 'border-l-5 border-l-color-marca bg-neutral-200' : ''}`}
              >
                {claveValor[1]}
              </span>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default ListaDesplegableOrden;
