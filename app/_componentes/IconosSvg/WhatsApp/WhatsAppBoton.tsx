"use client";
import { WHATSAPP_MENSAJE_GENERAL, WHATSAPP_NUMERO } from "@/app/_lib/constantes";
import Image from "next/image"

type WhatsAppButtonProps = {
  fijo?: boolean,
  mensaje?: string,
  dimension?: 'chico' | 'mediano' | 'grande',
}

const WhatsAppBoton = ({ fijo = false, mensaje, dimension = 'grande' }: WhatsAppButtonProps) => {
  const mensajeWhatsApp = encodeURIComponent(mensaje ?? WHATSAPP_MENSAJE_GENERAL);

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensajeWhatsApp}`;
  const ancho = dimension === 'chico' ? 'md:w-[3rem]' : dimension === 'mediano' ? 'md:w-16' : 'md:w-[4rem]';
  const alto = dimension === 'chico' ? 'md:h-[3rem]' : dimension === 'mediano' ? 'md:h-16' : 'md:h-[4rem]';
  const padding = dimension === 'chico' ? 'p-[.6rem]' : dimension === 'mediano' ? 'p-2' : 'p-[.75rem]';

  const anchoMobil = dimension === 'chico' ? 'w-[2.8rem]' : dimension === 'mediano' ? 'w-12' : 'w-[3.6rem]';
  const altoMobil = dimension === 'chico' ? 'h-[2.8rem]' : dimension === 'mediano' ? 'h-12' : 'h-[3.6rem]';

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
      <button className={`${fijo ? "fixed z-50 outline-none cursor-pointer right-1 bottom-[15vh] md:right-2 md:bottom-[20vh]" : "block"} ${anchoMobil} ${ancho} ${altoMobil} ${alto} ${padding} rounded-full bg-green-500 text-white hover:bg-green-600`}>
        <Image width={70} height={70} className="object-cover" alt='Consultar por WhatsApp' src={`https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrofierros/genericas/whatsapp.svg`} priority loading='eager' />
      </button>
    </a>
  );
};

export default WhatsAppBoton;
