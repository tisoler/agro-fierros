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

  const manejarClickCategoria = (e: ChangeEvent<HTMLInputElement>, categoria: CategoriaTipo) => {
    if (!e.target || !categoria) return;
    e.stopPropagation();

    const parametros = new URLSearchParams(queryString);
    if (e.target?.checked) {
      // Quitar el nodo padre si se selecciona un nodo hijo
      // Quitar los nodos hijos si seleccionan al nodo padre
      // IMPORTANTE: Esto funciona un solo nivel hacia arriba, para 'todas' se maneja en forma separada
      if (categoria.slug === 'todas' ) {
        // Selecciona 'todas', quita la selección de cad nodo individual
        parametros.delete(URL_PARAMETRO.CATEGORIA);
      } else {
        if (categoriaSlug?.includes('todas')) {
          // Cada vez que se selecciona un nodo individual remover 'todas' de la selección
          parametros.delete(URL_PARAMETRO.CATEGORIA, 'todas');
        }
        if (arbolCategoria[categoria.id]) {
          // Si selecciona un nodo padre, deseleccionar los nodos hijos
          arbolCategoria[categoria.id]?.forEach(catHija => {
            parametros.delete(URL_PARAMETRO.CATEGORIA, catHija.slug);
          })
        }
        // Cuando selecciona un nodo hijo, deseleccionar el nodo padre
        for (const catPadreId of Object.keys(arbolCategoria)) {
          if (arbolCategoria[Number(catPadreId)].some(ch => ch.id === categoria.id)) {
            // Recuperar el nodo padre - IMPORTANTE: funciona sólo en el primer nivel debajo de 'todas'
            const nodoPadre = arbolCategoria[1].find(cat => cat.id === Number(catPadreId));
            parametros.delete(URL_PARAMETRO.CATEGORIA, nodoPadre?.slug || '');
            break;
          }
        };
      }
      parametros.append(URL_PARAMETRO.CATEGORIA, categoria.slug);
    } else {
      parametros.delete(URL_PARAMETRO.CATEGORIA, categoria.slug);
    }
    parametros.delete(URL_PARAMETRO.MARCA);

    const nuevoPath = path + '?' + parametros.toString();
    router.push(nuevoPath);
  };

  const dibujarArbolCategorias = (idCategoria: number, nivel = 0): React.ReactNode => {
    const margenIzq = nivel > 0 ? '1rem' : '0';
    const categoriasHijas = arbolCategoriaEstado[idCategoria];
    return (
      <ul>
        {
          categoriasHijas?.flatMap(categoria => (
            <React.Fragment key={categoria.id}>
              <li style={{ marginLeft: margenIzq }}> {/* // Incrementar margen izquierdo por nivel de profundidad */}
                <label className="flex items-center gap-2 cursor-pointer hover:bg-neutral-200 px-2 py-1 rounded text-base">
                  <input
                    title={`Filtrar por ${categoria?.titulo}`}
                    type='checkbox'
                    className="cursor-pointer appearance-none w-4 h-4 border-[1.7px] border-neutral-500 focus:outline-none checked:bg-neutral-600"
                    onChange={(e) => manejarClickCategoria(e, categoria)}
                    checked={categoriaSlug?.includes(categoria?.slug || '') || false}
                  />
                  {categoria?.titulo}
                </label>
                { dibujarArbolCategorias(categoria.id, nivel + 1) }
              </li>
            </React.Fragment>
          ))
        }
      </ul>
    );
  };

  return (
    <div className="flex flex-col text-xl p-3 bg-color-fondo-gris">
      <h3 className="font-semibold mb-1">Categorías</h3>
      { dibujarArbolCategorias(-1) }
    </div>
  );
};

export default FiltroCategorias;
