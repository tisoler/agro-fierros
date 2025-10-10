'use client';
import { RefObject, Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cdnLoader } from "@/app/_lib/utilidades";
import estilo from './encabezado.module.css';
import BarraBusqueda from "./BarraBusqueda";

export function Encabezado() {
  const headerMobileRef = useRef<HTMLDivElement>(null);
  const headerEscritorioRef = useRef<HTMLDivElement>(null);
  const lastScrollYMobile = useRef<number>(0);
  const lastScrollYEscritorio = useRef<number>(0);
  const [mostrarBarraBusqueda, setMostrarBarraBusqueda] = useState<boolean>(false);

  useEffect(() => {
    // Implementación del header dinámico
    lastScrollYMobile.current = window.scrollY;
    lastScrollYEscritorio.current = window.scrollY;

    const verificarVisibilidadHeader = (headerRef: RefObject<HTMLDivElement | null>, lastScrollY: RefObject<number>) => {
      if (!headerRef.current) return;
      // Detectar la dirección del scroll
      if (window.scrollY <= lastScrollY.current || window.scrollY < 50) {
          // Scroll hacia arriba - mostrar header
          // O estamos en la parte superior
          headerRef.current.classList.remove(estilo.hidden);
      } else {
          // Scroll hacia abajo - ocultar header
          headerRef.current.classList.add(estilo.hidden);
      }
      
      lastScrollY.current = window.scrollY;
    }

    window.addEventListener('scroll', () => verificarVisibilidadHeader(headerMobileRef, lastScrollYMobile));
    window.addEventListener('scroll', () => verificarVisibilidadHeader(headerEscritorioRef, lastScrollYEscritorio));

    return () => {
      window.removeEventListener('scroll', () => verificarVisibilidadHeader(headerMobileRef, lastScrollYMobile));
      window.removeEventListener('scroll', () => verificarVisibilidadHeader(headerEscritorioRef, lastScrollYEscritorio));
    };
  }, []);

  return (
    <>
      { /* Bloque extra que agrega espacio para que el header no coma pantalla ya que es fixed (el contenido que queda por detrá sube hasta el límite de arriba) */ }
      <div className={`${estilo.headerPlaceholder} h-[60px] bg-white`}></div>
      <>
        <header ref={headerMobileRef} className={`flex w-full h-[60px] fixed top-0 left-0 z-50 bg-color-marca ${estilo.header}`}>
          <div className="flex w-full items-center justify-between px-2 py-3 md:pl-6 md:pr-0 md:py-0">
            <Link prefetch={false} href="/" className={`flex items-center text-white ${mostrarBarraBusqueda ? 'hidden' : 'flex'}`}>
              <div className="flex justify-center items-center mr-[0.4rem]">
                <Image
                  width={26}
                  height={26}
                  alt="Fabio Tommasi Agro"
                  priority
                  loading='eager'
                  src={"https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/logo.svg"}
                />
              </div>
              <h1 className="grid cols-2 text-[25px] md:text-2xl">
                <span className="font-semibold col-1 row-1 leading-5">
                  Fabio Tommasi
                </span>
                <span className="col-2 row-1 leading-5">
                  &nbsp;Agro
                </span>
              </h1>
            </Link>
            <Suspense>
              <BarraBusqueda mostrarBarra={mostrarBarraBusqueda} alternarBarraCallback={(valor) => setMostrarBarraBusqueda(valor)} />
            </Suspense>
            {/* Escritorio - Marcas PNC + Ombú */}
            <div className="hidden md:flex h-full justify-around items-center gap-4 bg-white pr-4 pl-10">
              <a href="https://pncremolques.com.ar" target="_blank">
                <Image
                  loader={cdnLoader}
                  width={384}
                  height={122}
                  className="h-[55px] w-auto"
                  priority
                  loading='eager'
                  alt="PNC remolques"
                  src={"https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/pnc-logo.webp"}
                />
              </a>
              <a href="https://www.maquinasombu.com.ar/" target="_blank">
                <Image
                  loader={cdnLoader}
                  width={384}
                  height={150}
                  className="h-[55px] w-auto"
                  priority
                  loading="eager"
                  alt="Maquinarias agrícolas y remolques Ombú"
                  src={"https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/ombu-logo.webp"}
                />
              </a>
            </div>
          </div>
        </header>
        {/* MÓVIL - Marcas PNC + Ombú */}
        <div className="flex md:hidden justify-around items-center bg-white py-1 md:hidden w-full">
          <a href="https://pncremolques.com.ar" target="_blank">
            <Image
              loader={cdnLoader}
              width={384}
              height={122}
              priority
              loading="eager"
              className="h-[53px] w-auto"
              alt="PNC remolques"
              src={"https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/pnc-logo.webp"}
            />
          </a>
          <a href="https://www.maquinasombu.com.ar/" target="_blank">
            <Image
              loader={cdnLoader}
              width={384}
              height={150}
              priority
              loading='eager'
              className="h-[53px] w-auto"
              alt="Maquinarias agrícolas y remolques Ombú"
              src={"https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/ombu-logo.webp"}
            />
          </a>
        </div>
      </>
    </>
  )
};
