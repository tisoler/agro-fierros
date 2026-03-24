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
      { /* Bloque extra que agrega espacio para que el header no coma pantalla ya que es fixed (el contenido que queda por detrá sube hasta el límite de arriba) */}
      <div className={`${estilo.headerPlaceholder} h-[60px] bg-white`}></div>
      <header ref={headerMobileRef} className={`flex w-full h-[60px] fixed top-0 left-0 z-50 bg-color-marca ${estilo.header}`}>
        <div className="flex w-full items-center justify-between px-2 py-3 md:px-6 md:py-0">
          <Link prefetch={false} href="/" className={`flex items-center text-white ${mostrarBarraBusqueda ? 'hidden' : 'flex'}`}>
            <div className="flex justify-center items-center mr-[0.4rem]">
              <Image
                width={26}
                height={26}
                alt="AgroFierros"
                priority
                loading='eager'
                src={"https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrofierros/genericas/logo.svg"}
              />
            </div>
            <h1 className="grid cols-2 text-[25px] md:text-2xl">
              <span className="font-semibold col-1 row-1 leading-5">
                AgroFierros
              </span>
            </h1>
          </Link>
          <Suspense>
            <BarraBusqueda mostrarBarra={mostrarBarraBusqueda} alternarBarraCallback={(valor) => setMostrarBarraBusqueda(valor)} />
          </Suspense>
          <ul className='hidden md:flex flex justify-center gap-4'>
            <li>
              <a href='https://www.instagram.com/fabiotommasi83/' target='_blank' title='Instagram' className='underline'>
                <Image width={24} height={24} loading='lazy' alt="Instagram" src={'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrofierros/genericas/instagram.svg'} />
              </a>
            </li>
            <li>
              <a href='https://www.facebook.com/fabio.tommasi.520' target='_blank' title='Facebook' className='underline'>
                <Image width={24} height={24} loading='lazy' alt="Facebook" src={'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrofierros/genericas/facebook.svg'} />
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  )
};
