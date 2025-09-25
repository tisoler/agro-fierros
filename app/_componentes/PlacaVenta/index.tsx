'use client';
import { cdnLoader } from "@/app/_lib/utilidades";
import Image from "next/image";

const URL_LOGO = 'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/logo-rojo-palido.svg';

const PlacaVenta = () => {
  return (
    <div
      className="
        relative flex bg-[#211e1e] w-[88%] lg:w-[75%] xl:w-[70%] 2xl:w-[50%] h-auto md:h-[408px] rounded-lg mx-auto 
        text-white font-semibold text-xl lg:text-3xl p-1 md:p-4 mt-12 mb-32 md:mb-48
      "
    >
      <div className="flex flex-col max-w-[100%] md:max-w-[65%] gap-3 justify-between pt-[270px] pb-6 md:py-6 pl-2 md:pl-3">
        <p className="flex gap-2 items-center pr-2 text-center text-[22px] md:text-4xl">
          10 años de experiencia en el sector
        </p>
        <p className="flex gap-2 items-center pr-2">
          <Image src={URL_LOGO} alt="Logo Fabio Tommasi Agro" width={15} height={15} className="ml-1" loading="lazy" />
          Consiga su unidad financiada
        </p>
        <p className="flex gap-2 items-center pr-2">
          <Image src={URL_LOGO} alt="Logo Fabio Tommasi Agro" width={15} height={15} className="ml-1" loading="lazy" />
          Nacimos en el campo, sabemos de qué se trata
        </p>
        <p className="flex gap-2 items-center pr-2">
          <Image src={URL_LOGO} alt="Logo Fabio Tommasi Agro" width={15} height={15} className="ml-1" loading="lazy" />
          Asesoramiento personalizado
        </p>
        <p className="flex gap-2 items-center pr-2">
          <Image src={URL_LOGO} alt="Logo Fabio Tommasi Agro" width={15} height={15} className="ml-1" loading="lazy" />
          Servicio post-venta siempre y en todo lugar
        </p>
      </div>
      <div className="absolute !right-[-10px] md:!right-[-55px] !top-[40px] md:!top-[70px]">
        <div className="relative h-[220px] md:h-[230px] w-[320px] md:w-[350px]">
          <Image
            loader={cdnLoader}
            loading="lazy"
            src='https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/bloque-venta.webp'
            alt='Consiga su unidad financiada'
            fill
            sizes="(max-width: 767px) 320px, 350px"
            className="w-auto h-full object-cover object-center"
            quality={85} // Optimización de calidad
          />
        </div>
      </div>
      <div className="absolute z-40 flex justify-end items-end pb-1 pr-2 pl-10 md:pl-20 pt-3 md:pt-5 top-[12px] md:top-6 right-[-10px] md:right-[-50px] bg-[#e93d44] text-2xl md:text-3xl text-[#211e1e] uppercase">
        compromiso
      </div>
    </div>
  );
};

export default PlacaVenta;
