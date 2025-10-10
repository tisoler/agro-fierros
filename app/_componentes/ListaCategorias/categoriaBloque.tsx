'use client';
import Link from "next/link";
import Image from "next/image";
import estilo from './categoriaBloque.module.css';
import { CategoriaTipo } from "@/app/_lib/tipos";
import { cdnLoader } from "@/app/_lib/utilidades";

const CategoriaBloque = ({ categoria, esGrande = false }: { categoria: CategoriaTipo, esGrande?: boolean }) => {
  return (
    <Link
      href={`/buscar?categoria=${categoria.slug}`}
      prefetch={false}
      className={`
        relative w-full flex flex-col items-start justify-center aspect-[4/5] md:aspect-auto md:h-[30vw]
        ${esGrande ? 'md:col-span-5' : 'md:col-span-4'} group ${estilo.categoriaBloque}
      `}
    >
      <div className="relative aspect-[4/5] md:aspect-auto md:h-[30vw] w-full">
        <Image
          loader={cdnLoader}
          src={categoria.imagenEscritorio}
          alt={categoria.titulo}
          loading="lazy"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center"
          quality={85} // Optimización de calidad
        />
      </div>
      <div
        className={`absolute bottom-0 left-0 w-full h-full pointer-events-none ${estilo.categoriaOverlay}`}
      ></div>
      <div className="absolute flex flex-col justify-center items-center gap-2 w-full bottom-16 px-2 md:px-8">
        <h2 className="text-white text-4xl md:text-5xl font-semibold">{categoria.titulo}</h2>
        <p className={`text-neutral-200 text-xl px-3 md:px-20 transition-all duration-300 ${estilo.categoriaDescripcion}`}>
          {categoria.descripcion}
        </p>
      </div>
      <div className="absolute bottom-0 flex gap-2 items-center justify-center text-white font-semibold text-lg h-24 w-full">
        <div className="bg-color-marca w-6 h-[1px]"></div>
        Dale click para ver más
        <div className="bg-color-marca w-6 h-[1px]"></div>
      </div>
    </Link>
  );
};

export default CategoriaBloque;
