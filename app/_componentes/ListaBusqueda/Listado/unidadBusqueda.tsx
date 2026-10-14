import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NUEVO, NOVEDAD, USADO } from "@/app/_lib/constantes";
import { UnidadConMarca } from "@/app/_lib/tipos";
import { cdnLoader, formatearPrecio } from "@/app/_lib/utilidades";
import CintaVendida from "@/app/_componentes/CintaVendida";

const UnidadBuscador = (
  { unidad, esDispositivoMovil = true, priorizar }:
    { unidad: UnidadConMarca, esDispositivoMovil?: boolean, priorizar?: boolean }
) => {
  const dimensions = esDispositivoMovil
    ? { width: 180, height: 180 }
    : { width: 280, height: 250 };

  return (
    <Link
      href={`/unidad/${unidad.slug}`}
      key={unidad.id}
      prefetch={false}
      className="
        flex flex-row md:flex-col w-full md:max-w-[340px] h-[180px] md:h-auto group bg-white
        rounded-card overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-0.5
        transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-color-marca
      "
    >
      <div className="relative w-[180px] md:w-full md:max-w-[340px] h-[180px] md:h-[250px] shrink-0 overflow-hidden">
        <Image
          loader={cdnLoader}
          src={unidad.imagenDestacadaUrl}
          alt={unidad.imagenDestacadaTextoAlt}
          priority={priorizar}
          loading={priorizar ? 'eager' : 'lazy'}
          fetchPriority={priorizar ? 'high' : 'low'}
          width={dimensions.width}
          height={dimensions.height}
          sizes="(max-width: 767px) 180px, 325px"
          className={`object-cover object-center h-full w-full`}
          quality={80}
        />
        {/* Badges de estado compactos sobre la imagen */}
        <div className="absolute top-2 left-2 flex gap-1">
          <span className={`
            rounded-full px-2 py-0.5 text-[10px] md:text-xs font-bold text-white shadow-sm
            ${unidad.nuevo ? 'bg-estado-nueva' : 'bg-estado-usada'}
          `}>
            {unidad.nuevo ? NUEVO.toUpperCase() : USADO.toUpperCase()}
          </span>
          {unidad.esOportunidad && (
            <span className="rounded-full px-2 py-0.5 text-[10px] md:text-xs font-bold text-white shadow-sm bg-estado-oportunidad">
              OPORTUNIDAD
            </span>
          )}
          {unidad.esNovedad && (
            <span className="rounded-full px-2 py-0.5 text-[10px] md:text-xs font-bold text-white shadow-sm bg-blue-600">
              {NOVEDAD.toUpperCase()}
            </span>
          )}
        </div>
        {/* Precio en dólares (solo si tiene) */}
        {unidad.precioDolar != null && (
          <div className="absolute bottom-2 left-2 rounded-btn bg-slate-900/85 px-2 py-0.5 text-xs md:text-sm font-bold text-white shadow-sm backdrop-blur-sm">
            {formatearPrecio(unidad.precioDolar, unidad.monedaPrecio)}
          </div>
        )}
        {unidad.vendida && <CintaVendida />}
      </div>
      <div className="flex flex-col flex-1 md:flex-none w-[calc(100%-180px)] md:w-full">
        <h2
          className="
            flex flex-1 md:flex-none items-center justify-center text-center text-neutral-800
            py-2 md:py-3 px-2 text-[15px] md:text-lg leading-5 md:leading-6 min-h-[56px] md:min-h-[64px]
            break-words line-clamp-2 font-semibold
          "
        >
          {unidad.titulo}
        </h2>
        <div className="flex h-[52px] text-gray-600 border-t border-slate-100">
          <div className="flex flex-col justify-center items-center w-[30%] md:w-full h-full text-sm md:text-base text-center text-neutral-700 px-1">
            <span className="text-[11px] md:text-xs text-slate-400 uppercase">Modelo</span>
            <span>{unidad.modelo || new Date().getFullYear().toString()}</span>
          </div>
          <div className="flex justify-center items-center h-full w-[40%] md:w-full text-sm md:text-base text-center text-neutral-700 px-1 border-l border-slate-100">
            {unidad.marca?.nombre || ''}
          </div>
          <div className="hidden md:flex md:w-full justify-center items-center text-xs text-slate-400 border-l border-slate-100">
            {unidad.vendida ? 'Vendida' : 'Disponible'}
          </div>
        </div>
        <div className="flex justify-center items-center bg-color-marca md:bg-color-sec-marca group-hover:bg-color-marca text-white py-2 text-lg md:text-base font-bold md:font-semibold transition-colors duration-300">
          Ver más
        </div>
      </div>
    </Link>
  );
};

export default UnidadBuscador;
