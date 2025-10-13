import { URL_PARAMETRO } from "@/app/_lib/constantes";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";
import { IconoLupa } from "../../Iconos/Lupa";

const BarraBusqueda = ({ mostrarBarra, alternarBarraCallback }: { mostrarBarra: boolean, alternarBarraCallback: (valor: boolean) => void }) => {
  const queryString = useSearchParams();
  const parametros = new URLSearchParams(queryString);
  const router = useRouter();
  const inputBusquedaMovilRef = useRef<HTMLInputElement>(null);

  const buscarProductos = (e: FormEvent<HTMLFormElement>, esMovil = true) => {
    if (!e.target) return;
    e.preventDefault();

    const datosFormulario = new FormData(e.target as HTMLFormElement);
    const termino = datosFormulario.get(URL_PARAMETRO.TERMINO)?.toString().trim() || '';

    if (!termino) {
      parametros.delete(URL_PARAMETRO.TERMINO);
    } else {
      parametros.set(URL_PARAMETRO.TERMINO, termino);
    }

    if (esMovil) alternarBarraCallback(false);

    const nuevoPath = '/buscar?' + parametros.toString();
    router.push(nuevoPath);
  };

  const mostrarBarraBusquedaMovil = (e: FormEvent<HTMLFormElement>) => {
    if (!e.target) return;
    e.preventDefault();

    alternarBarraCallback(true);
  };

  useEffect(() => {
    if (mostrarBarra && inputBusquedaMovilRef.current) inputBusquedaMovilRef.current.focus();
  }, [mostrarBarra]);

  return (
    <>
      <div className="hidden md:flex w-2/6 xl:w-[42%] bg-white rounded-sm px-4 shadow-sm drop-shadow-sm">
        <form onSubmit={(e) => buscarProductos(e, false)} className="flex w-full items-center">
          <input
            type="text"
            placeholder="Buscar..."
            name={URL_PARAMETRO.TERMINO}
            className="w-full placeholder-neutral-600 rounded-sm text-neutral-800 text-xl outline-none"
            defaultValue={parametros.get(URL_PARAMETRO.TERMINO) || ''}
          />
          <button aria-label="Buscar" type="submit" className="ml-3 flex items-center justify-center py-2 cursor-pointer">
            <IconoLupa color="#eb1923" />
          </button>
        </form>
      </div>
      <div className={`flex md:hidden items-center transition-all duration-300 ${mostrarBarra ? 'bg-white w-full shadow-sm drop-shadow-sm' : 'bg-color-marca'} rounded-sm px-3`}>
        <form className="flex w-full items-center" onSubmit={!mostrarBarra ? mostrarBarraBusquedaMovil : buscarProductos}>
          <input
            ref={inputBusquedaMovilRef}
            type="text"
            placeholder="Buscar..."
            name={URL_PARAMETRO.TERMINO}
            className={`w-full rounded-sm placeholder-neutral-600 text-neutral-800 text-xl outline-none ${mostrarBarra ? 'flex' : 'hidden'}`}
            defaultValue={parametros.get(URL_PARAMETRO.TERMINO) || ''}
          />
          <button aria-label={mostrarBarra ? 'Buscar' : 'Desplegar buscador'} type="submit" className="ml-1 flex items-center justify-center p-1 outline-none">
            <IconoLupa color={mostrarBarra ? '#eb1923' : '#ffffff'} />
          </button>
        </form>
      </div>
    </>
  );
};

export default BarraBusqueda;
