import { URL_PARAMETRO } from "@/app/_lib/constantes";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";
import { IconoLupa } from "../../Iconos/Lupa";

const BarraBusqueda = ({ mostrarBarra, alternarBarraCallback }: { mostrarBarra: boolean, alternarBarraCallback: (valor: boolean) => void }) => {
  const queryString = useSearchParams();
  const parametros = new URLSearchParams(queryString);
  const router = useRouter();

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

  const mostrarBarraBusquedaMovil = (e: FormEvent<HTMLFormElement>, esMovil = true) => {
    if (!e.target) return;
    e.preventDefault();

    if (esMovil) alternarBarraCallback(true);
  };

  return (
    <>
      <div className="hidden md:flex w-2/6 xl:w-[42%] bg-white/40 rounded-sm px-4">
        <form onSubmit={(e) => buscarProductos(e, false)} className="flex w-full items-center">
          <input
            type="text"
            placeholder="Buscar..."
            name={URL_PARAMETRO.TERMINO}
            className="w-full text-white placeholder-white/90 rounded-sm text-black text-xl outline-none"
            defaultValue={parametros.get(URL_PARAMETRO.TERMINO) || ''}
          />
          <button aria-label="Buscar" type="submit" className="ml-3 flex items-center justify-center py-2 cursor-pointer">
            <IconoLupa color="#ffffff" />
          </button>
        </form>
      </div>
      <div className={`flex md:hidden items-center transition-all duration-300 ${mostrarBarra ? 'bg-white/40 w-full' : 'bg-color-marca'} rounded-sm px-3`}>
        <form className="flex w-full items-center" onSubmit={!mostrarBarra ? mostrarBarraBusquedaMovil : buscarProductos}>
          <input
            type="text"
            placeholder="Buscar..."
            name={URL_PARAMETRO.TERMINO}
            className={`w-full rounded-sm placeholder-white/90 text-white text-xl outline-none ${mostrarBarra ? 'flex' : 'hidden'}`}
            defaultValue={parametros.get(URL_PARAMETRO.TERMINO) || ''}
          />
          <button aria-label={mostrarBarra ? 'Buscar' : 'Desplegar buscador'} type="submit" className="ml-1 flex items-center justify-center p-1">
            <IconoLupa color="#ffffff" />
          </button>
        </form>
      </div>
    </>
  );
};

export default BarraBusqueda;
