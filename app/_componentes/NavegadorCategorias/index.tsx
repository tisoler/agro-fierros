'use client';
import { CategoriaTipo } from "@/app/_lib/tipos";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

const NavegadorCategorias = ({ categorias }: { categorias: CategoriaTipo[] }) => {
  const router = useRouter();

  const volverBusqueda = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <div className="flex text-neutral-700 gap-1 md:gap-2 text-sm md:text-lg px-2">
      <a href="" onClick={volverBusqueda} title="Volver" className="hover:text-color-marca underline">Volver</a> |
      <div className="flex">
        {
          categorias?.map((cat, idx) => (
            <div key={cat.id} className="flex items-center">
              {idx > 0 ? <span className="mx-1 md:mx-2">{'>'}</span> : null}
              <a
                href={cat.href}
                title={cat.titulo}
                className="hover:text-color-marca underline line-clamp-1"
              >
                {cat.titulo}
              </a>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default NavegadorCategorias;
