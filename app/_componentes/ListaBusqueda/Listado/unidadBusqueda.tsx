import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NUEVO, USADO } from "@/app/_lib/constantes";
import { UnidadConMarca } from "@/app/_lib/tipos";
import { cdnLoader } from "@/app/_lib/utilidades";

const UnidadBuscador = (
  { unidad, esDispositivoMovil = true, priorizar }:
    { unidad: UnidadConMarca, esDispositivoMovil?: boolean, priorizar?: boolean }
) => {
  const dimensions = esDispositivoMovil
    ? { width: 180, height: 180 }  // iPhone promedio 4:5
    : { width: 280, height: 250 };

  return (
    <Link
      href={`/unidad/${unidad.slug}`}
      key={unidad.id}
      className="flex flex-row md:flex-col w-full md:max-w-[340px] h-[180px] md:h-[430px] group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
    >
      <div className="relative w-[180px] md:w-full md:max-w-[340px] h-[180px] md:h-[250px]">
        <Image
          loader={cdnLoader}
          src={unidad.imagenDestacadaUrl}
          alt={unidad.imagenDestacadaTextoAlt}
          priority={priorizar}
          width={dimensions.width}
          height={dimensions.height}
          sizes="(max-width: 767px) 180px, 325px"
          className={`object-cover object-center h-full w-full`}
          quality={80}
        />
      </div>
      <div className="flex flex-col w-[calc(100%-180px)] md:w-full">
        <h2
          className="
            flex flex-1 items-center justify-center text-center text-neutral-800 py-3 text-[18px] md:text-[22px] leading-6 min-h-[72px]
            break-words px-2 py-3 line-clamp-2 border-x-[1.5px] border-x-neutral-200 border-t-[1.5px] border-t-neutral-200 md:border-t-0 wei font-semibold
          "
        >
          {unidad.titulo}
        </h2>
        <div className="flex h-[64px] text-gray-600 border-t-1 border-t-neutral-200 border-x-[1.5px] border-x-neutral-200">
          <div className={`flex justify-center items-center w-[30%] md:w-full h-full text-base md:text-lg text-neutral-900 bg-white`}>
            {unidad.nuevo ? NUEVO : USADO}
          </div>
          <div className="flex flex-col justify-center items-center w-[30%] md:w-full h-full text-sm md:text-base text-center text-neutral-700 border-x-[1px] border-x-neutral-200">
            <span>Modelo</span>
            <span>{unidad.modelo || new Date().getFullYear.toString()}</span>
          </div>
          <div className="flex justify-center items-center h-full w-[40%] md:w-full text-sm md:text-base text-center text-neutral-700 px-1">
            {unidad.marca?.nombre || ''}
          </div>
        </div>
        <div className="flex justify-center items-center bg-color-marca md:bg-[#1E293B] group-hover:bg-color-marca text-white py-2 text-xl md:text-lg font-bold md:font-semibold">Ver más</div>
      </div>
    </Link>
  );
};

export default UnidadBuscador;
