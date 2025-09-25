'use client';
import { RefObject, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconoLupa } from "../Iconos/Lupa";
import { cdnLoader } from "@/app/_lib/utilidades";
import estilo from './encabezado.module.css';

export function Encabezado() {
  const headerMobileRef = useRef<HTMLDivElement>(null);
  const headerEscritorioRef = useRef<HTMLDivElement>(null);
  const lastScrollYMobile = useRef<number>(0);
  const lastScrollYEscritorio = useRef<number>(0);

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
      <div className={`${estilo.headerPlaceholder} h-[60px] bg-white`}></div>
      <header ref={headerEscritorioRef} className={`w-full h-[60px] bg-color-marca fixed top-0 left-0 z-50 ${estilo.header} ${estilo.headerEscritorio}`}>
        <div className="pl-6 flex w-full items-center justify-between">
          <Link prefetch={false} href="/" className="flex items-center text-2xl text-slate-50">
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
            <h1 className="grid cols-2">
              <span className="font-semibold col-1 row-1 leading-5">
                Fabio Tommasi
              </span>
              <span className="col-2 row-1 leading-5">
                &nbsp;Agro
              </span>
            </h1>
          </Link>
          <div className="flex w-2/6 xl:w-[42%] bg-white rounded-sm px-3">
            <input type="text" placeholder="Buscar..." className="w-full bg-white rounded-sm text-black text-xl outline-none" />
            <button aria-label="Buscar" className="ml-3 flex items-center justify-center py-2">
              <IconoLupa color="#eb1923" />
            </button>
          </div>
          <div className="flex h-full justify-around items-center gap-4 bg-white pr-4 pl-10">
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
      <>
        <header ref={headerMobileRef} className={`w-full fixed top-0 left-0 z-50 ${estilo.header} ${estilo.headerMobile}`}>
          <div className="flex w-full items-center justify-between pl-2 py-3 bg-color-marca">
            <Link prefetch={false} href="/" className="brand flex items-center text-white">
              <div className="flex justify-center items-center mr-[0.4rem]">
                <Image
                  width={25}
                  height={25}
                  alt="Fabio Tommasi Agro"
                  priority
                  loading='eager'
                  src={"https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/logo.svg"}
                />
              </div>
              <h1 className="grid cols-2 text-[23px]">
                <span className="font-semibold col-1 row-1 leading-5">
                  Fabio Tommasi
                </span>
                <span className="col-2 row-1 leading-5">
                  &nbsp;Agro
                </span>
              </h1>
            </Link>
            <div className="flex items-center">
              <button aria-label="Desplegar buscador" className="ml-3 flex items-center justify-center p-1">
                <IconoLupa />
              </button>
              <button className={estilo.burger} id="burger" aria-label="Abrir menu">
                <span className={estilo.burgerLine}></span>
                <span className={estilo.burgerLine}></span>
                <span className={estilo.burgerLine}></span>
              </button>
            </div>
          </div>
        </header>
        <div className="flex justify-around items-center bg-white py-1 md:hidden w-full">
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
