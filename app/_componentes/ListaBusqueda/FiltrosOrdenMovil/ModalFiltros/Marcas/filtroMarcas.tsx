'use client';
import { URL_PARAMETRO } from "@/app/_lib/constantes";
import { MarcaTipo } from "@/app/_lib/tipos";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

const FiltroMarcas = ({ marcas, marcasSlug }: { marcas: MarcaTipo[], marcasSlug: string[] }) => {
  const router = useRouter();
  const queryString = useSearchParams();
  const path = usePathname();

  const manejarClickMarca = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.name) return;
    e.stopPropagation();

    const parametros = new URLSearchParams(queryString);
    if (!marcasSlug.includes(e.target.name)) {
      parametros.append(URL_PARAMETRO.MARCA, e.target.name);
    } else {
      parametros.delete(URL_PARAMETRO.MARCA, e.target.name);
    }
    
    const nuevoPath = path + '?' + parametros.toString();
    router.push(nuevoPath);
  };

  return (
    <ul className="flex flex-col text-xl p-3 bg-color-fondo-gris">
      <h3 className="font-semibold mb-1">Marcas</h3>
      {
        marcas?.sort((a, b) => (a?.nombre || '').localeCompare(b?.nombre || ''))?.map(marca => (
          <li key={marca?.id} className="flex flex-col items-center">
            <hr className="border-t-1 border-t-neutral-300 w-[98%]"></hr>
            <label className={`flex items-center w-full gap-2 cursor-pointer active:bg-neutral-200 px-2 py-2 rounded text-lg ${marcasSlug.includes(marca.slug) ? 'bg-neutral-200' : ''}`}>
              <input
                title={`Filtrar por ${marca?.nombre}`}
                name={marca?.slug || ''}
                type='checkbox'
                className="cursor-pointer appearance-none w-6 h-6 border-[1.7px] border-neutral-500 focus:outline-none checked:bg-neutral-600"
                onChange={manejarClickMarca}
                checked={marcasSlug?.includes(marca?.slug || '') || false}
              />
              {marca?.nombre}
            </label>
          </li>
        ))
      }
    </ul>
  )
};

export default FiltroMarcas;
