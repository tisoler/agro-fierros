import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NUEVO, USADO } from "@/app/_lib/constantes";
import { UnidadConMarca } from "@/app/_lib/tipos";
import { cdnLoader } from "@/app/_lib/utilidades";

const UnidadTarjeta = (
  { unidad, priorizar = false }:
  { unidad: UnidadConMarca, priorizar?: boolean }
) => {
  return (
    <Link
      href={`/unidad/${unidad.slug}`}
      key={unidad.id}
      className="flex flex-col w-[240px] md:w-[280px] group"
    >
      <div className="relative w-[240px] md:w-[280px] h-[220px] md:h-[250px]">
        <Image
          loader={cdnLoader}
          src={unidad.imagenDestacadaUrl}
          alt={unidad.imagenDestacadaTextoAlt}
          priority={priorizar}
          fill
          sizes="(max-width: 767px) 240px, 280px"
          className="object-cover object-center w-full h-full"
          quality={80}
        />
      </div>
      <h2
        className="
          flex items-center justify-center text-center text-neutral-800 py-3 text-xl leading-6 min-h-[72px]
          capitalize break-words px-2 py-3 line-clamp-2 border-x-[1.5px] border-x-neutral-200
        "
      >
        {unidad.titulo?.toLowerCase()}
      </h2>
      <div className="flex h-[64px] text-gray-600 border-t-1 border-t-neutral-200 border-x-[1.5px] border-x-neutral-200">
        <div className={`flex justify-center items-center w-full h-full text-lg text-neutral-900 bg-white`}>
          {unidad.nuevo ? NUEVO : USADO}
        </div>
        <div className="flex flex-col justify-center items-center w-full h-full text-center text-neutral-700 border-x-[1px] border-x-neutral-200">
          <span>Modelo</span>
          <span>{unidad.modelo || ''}</span>
        </div>
        <div className="flex justify-center items-center w-full h-full text-center text-neutral-700">
          {unidad.marca?.nombre || ''}
        </div>
      </div>
      <div className="flex justify-center items-center bg-color-marca md:bg-[#211e1e] group-hover:bg-color-marca text-white py-2 text-xl md:text-lg font-bold md:font-semibold">Ver más</div>
    </Link>
  );
};

export default UnidadTarjeta;
