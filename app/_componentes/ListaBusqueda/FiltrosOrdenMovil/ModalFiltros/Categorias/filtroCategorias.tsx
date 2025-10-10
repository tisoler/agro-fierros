'use client';
import { CategoriaTipo } from "@/app/_lib/tipos";
import React, { ChangeEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { URL_PARAMETRO } from "@/app/_lib/constantes";

const FiltroCategorias = (
  { arbolCategoria, categoriaSlug }:
  { arbolCategoria: Record<number, CategoriaTipo[]>, categoriaSlug?: string[] }
) => {
  const [arbolCategoriaEstado] = useState<Record<number, CategoriaTipo[]>>(arbolCategoria);
  const router = useRouter();
  const queryString = useSearchParams();
  const path = usePathname();

  const manejarClickCategoria = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.name) return;
    e.stopPropagation();

    const parametros = new URLSearchParams(queryString);
    if (e.target?.checked) {
      // Sacar 'todas' si se selecciona alguna categoría individual
      // Sacar las categorías individuales si se selecciona 'todas'
      if (e.target.name === 'todas' ) {
        parametros.delete(URL_PARAMETRO.CATEGORIA);
      } else if (categoriaSlug?.includes('todas')) {
        parametros.delete(URL_PARAMETRO.CATEGORIA, 'todas');
      }
      parametros.append(URL_PARAMETRO.CATEGORIA, e.target.name);
    } else {
      parametros.delete(URL_PARAMETRO.CATEGORIA, e.target.name);
    }
    parametros.delete(URL_PARAMETRO.MARCA);

    const nuevoPath = path + '?' + parametros.toString();
    router.push(nuevoPath);
  };

  const dibujarArbolCategorias = (idCategoria: number, nivel = -1): React.ReactNode => {
    const nuevoNivel = nivel + 1;
    const categoriasHijas = arbolCategoriaEstado[idCategoria];
    return (categoriasHijas?.flatMap(categoria => (
      <div key={categoria.id}>
        <li style={{ marginLeft: `${nuevoNivel}rem` }}> {/* // Incrementar margen izquierdo por nivel de profundidad */}
          <label className={`flex items-center gap-2 cursor-pointer active:bg-neutral-200 px-2 py-2 rounded text-lg ${categoriaSlug?.includes(categoria?.slug || '') ? 'bg-neutral-200' : ''}`}>
            <input
              title={`Filtrar por ${categoria?.titulo}`}
              name={categoria?.slug || ''}
              type='checkbox'
              className="cursor-pointer appearance-none w-6 h-6 border-[1.7px] border-neutral-500 focus:outline-none checked:bg-neutral-600"
              onChange={manejarClickCategoria}
              checked={categoriaSlug?.includes(categoria?.slug || '') || false}
            />
            {categoria?.titulo}
          </label>
        </li>
        {dibujarArbolCategorias(categoria.id, nuevoNivel)}
      </div>
    )));
  };

  return (
    <>
      <ul className="flex flex-col text-xl p-3 bg-color-fondo-gris">
        <h3 className="font-semibold mb-1">Categorías</h3>
        {
          dibujarArbolCategorias(-1)
        }
      </ul>
    </>
  );
};

export default FiltroCategorias;
