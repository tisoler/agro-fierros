'use client';
import { MarcaTipo } from "@/app/_lib/tipos";
import React, { ChangeEvent, useDeferredValue } from "react";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { URL_PARAMETRO } from "@/app/_lib/constantes";

const FiltrosMarcas = (
  { marcas, marcasSlug }:
  { marcas: MarcaTipo[], marcasSlug?: string[] }
) => {
  const router = useRouter();
  const queryString = useSearchParams();
  const path = usePathname();
  const deferredMarcas = useDeferredValue(marcas);

  const manejarClickMarca = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.name) return;
    e.stopPropagation();

    const parametros = new URLSearchParams(queryString);
    if (e.target.checked) {
      parametros.append(URL_PARAMETRO.MARCA, e.target.name);
    } else {
      parametros.delete(URL_PARAMETRO.MARCA, e.target.name);
    }
    
    const nuevoPath = path + '?' + parametros.toString();
    router.push(nuevoPath);
  };

  return (
    <>
      <ul className="flex flex-col text-xl p-3 bg-color-fondo-gris">
        <h3 className="font-semibold mb-1">Marcas</h3>
        {
          deferredMarcas?.sort((a, b) => (a?.nombre || '').localeCompare(b?.nombre || ''))?.map(marca => (
            <li key={marca?.id}>
              <label className="flex items-center gap-2 cursor-pointer hover:bg-neutral-200 px-2 py-1 rounded text-lg">
                <input
                  title={`Filtrar por ${marca?.nombre}`}
                  name={marca?.slug || ''}
                  type='checkbox'
                  className="cursor-pointer appearance-none w-4 h-4 border-[1.7px] border-neutral-500 focus:outline-none checked:bg-neutral-600"
                  onChange={manejarClickMarca}
                  checked={marcasSlug?.includes(marca?.slug || '') || false }
                />
                {marca?.nombre}
              </label>
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default FiltrosMarcas;
