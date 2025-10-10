import React from "react";
import Image from "next/image";
import CarruselUnidades from "./carruselUnidades";
import { CarruselUnidadesProps } from "@/app/_lib/tipos";

const CarruselUnidadesContenedor = async (
  { unidades, titulo, variante = 'grande', esDispositivoMovil = true, priorizar = false }: CarruselUnidadesProps
) => {
  return (
    <div className={`
      flex flex-col w-full ${variante === 'grande' ? 'py-12 md:py-20 px-2 md:px-20' : 'pt-4 pb-12 md:pt-10 md:pb-20 px-0'} 
    `}>
      {
        variante === 'grande' && (
          <Image
            src={'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/logo-rojo.svg'}
            loading={`${priorizar ? 'eager' : 'lazy'}`}
            priority={priorizar}
            alt="Logo Fabio Tommasi Agro"
            width={25}
            height={25}
            className="ml-1"
          />
        )
      }
      <h2 className={`${variante === 'grande' ? 'text-[28px] lg:text-5xl' : 'text-[20px] lg:text-3xl'} font-semibold text-black`}>
        {titulo}
      </h2>
      <CarruselUnidades unidades={unidades || []} esDispositivoMovil={esDispositivoMovil} priorizar={priorizar} />
    </div>
  );
}

export default CarruselUnidadesContenedor;
