'use client';
import React from "react";
import estilo from './carruselUnidades.module.css';
import BotonIzquierda from "../BotonIzquierda";
import BotonDerecha from "../BotonDerecha";
import { UnidadConMarca } from "@/app/_lib/tipos";
import UnidadTarjeta from "./carruselUnidad";

const CarruselUnidades = ({ unidades, esDispositivoMovil = true, priorizar = false }: 
  { unidades: UnidadConMarca[], esDispositivoMovil?: boolean, priorizar?: boolean }) => 
{
  let startX: number;
  let scrollLeft: number;
  const carruselRef = React.useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!carruselRef.current) return;
    startX = e.touches[0].clientX;
    scrollLeft = carruselRef.current.scrollLeft;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!carruselRef.current) return;
    const endX = e.changedTouches[0].clientX;
    const walk = endX - startX; // Calcular el desplazamiento
    carruselRef.current.scrollLeft = scrollLeft - walk; // Aplicar el desplazamiento
  };

  const handlePrev = () => {
    if (!carruselRef.current) return;
    carruselRef.current.scrollBy({
      left: -carruselRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    if (!carruselRef.current) return;
    carruselRef.current.scrollBy({
      left: carruselRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex items-center justify-center relative w-full overflow-hidden pt-6">
      <div className="hidden md:flex"><BotonIzquierda onClick={handlePrev} /></div>
      <div
        id="carrusel-unidades"
        className={`flex w-full gap-4 overflow-x-auto md:mx-1 ${estilo.webkitScrollbarHide}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        ref={carruselRef}
      >
        {unidades.map((unidad) => (
          <UnidadTarjeta
            key={unidad.id}
            unidad={unidad}
            esDispositivoMovil={esDispositivoMovil}
            priorizar={priorizar}
          />
        ))}
      </div>
      <div className="hidden md:flex"><BotonDerecha onClick={handleNext} /></div>
    </div>
  );
};

export default CarruselUnidades;
