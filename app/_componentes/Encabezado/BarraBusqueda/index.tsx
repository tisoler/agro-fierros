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
      <div className="hidden md:flex w-4/6 bg-slate-50 rounded-full px-4 border border-color-marca transition-colors hover:border-marca-700 hover:bg-marca-50/40 focus-within:bg-white focus-within:ring-2 focus-within:ring-marca-600/15">
        <form onSubmit={(e) => buscarProductos(e, false)} className="flex w-full items-center">
          <input
            type="text"
            placeholder="Buscar..."
            name={URL_PARAMETRO.TERMINO}
            className="w-full bg-transparent placeholder-neutral-500 rounded-full text-neutral-800 text-xl outline-none"
            defaultValue={parametros.get(URL_PARAMETRO.TERMINO) || ''}
          />
          <button aria-label="Buscar" type="submit" className="ml-3 flex items-center justify-center rounded-full p-1.5 cursor-pointer transition-colors hover:bg-marca-100">
            <IconoLupa color="#EA580C" />
          </button>
        </form>
      </div>
      <div className={`flex md:hidden items-center transition-colors rounded-full px-3 ${mostrarBarra ? 'bg-slate-50 w-full border border-color-marca focus-within:bg-white focus-within:ring-2 focus-within:ring-marca-600/15' : 'border border-transparent'}`}>
        <form className="flex w-full items-center" onSubmit={!mostrarBarra ? mostrarBarraBusquedaMovil : buscarProductos}>
          <input
            ref={inputBusquedaMovilRef}
            type="text"
            placeholder="Buscar..."
            name={URL_PARAMETRO.TERMINO}
            className={`w-full bg-transparent rounded-full placeholder-neutral-500 text-neutral-800 text-xl outline-none ${mostrarBarra ? 'flex' : 'hidden'}`}
            defaultValue={parametros.get(URL_PARAMETRO.TERMINO) || ''}
          />
          <button aria-label={mostrarBarra ? 'Buscar' : 'Desplegar buscador'} type="submit" className="ml-1 flex items-center justify-center rounded-full p-1.5 outline-none transition-colors hover:bg-marca-100">
            <IconoLupa color="#EA580C" />
          </button>
        </form>
      </div>
    </>
  );
};

export default BarraBusqueda;
