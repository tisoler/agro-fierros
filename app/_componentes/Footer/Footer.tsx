'use client';
import { cdnLoader } from '@/app/_lib/utilidades';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='grid grid-cols-1 auto-rows-auto gap-y-10 md:grid-cols-3 w-full h-[699px] md:h-[352px] bg-color-marca px-4 md:px-20 pt-12 md:pt-20 pb-6'>
      <Link href='/' title='Fabio Tommasi Agro - Inicio' className='flex items-start gap-2 col-1 row-1'>
        <Image alt='Logo Fabio Tommasi Agro' loading='lazy' src={'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/logo.svg'} width={50} height={50} />
        <h2 className='flex flex-col text-white text-[26px] pb-1'>
          <span className="font-bold leading-6">
            Fabio Tommasi
          </span>
          <span className='leading-6'>
            Agro
          </span>
        </h2>
      </Link>
      <div className='flex flex-col justify-center md:justify-start gap-2 col-1 row-4 md:row-2 w-full md:w-fit'>
        <h2 className='text-white text-2xl font-semibold text-center'>Redes sociales</h2>
        <ul className='flex flex justify-center gap-4'>
          <li>
            <a href='https://www.instagram.com/fabiotommasi83/' target='_blank' title='Instagram' className='underline'>
              <Image width={24} height={24} loading='lazy' alt="Instagram" src={'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/instagram.svg'} />
            </a>
          </li>
          <li>
            <a href='https://www.facebook.com/fabio.tommasi.520' target='_blank' title='Facebook' className='underline'>
              <Image width={24} height={24} loading='lazy' alt="Facebook" src={'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/facebook.svg'} />
            </a>
          </li>
        </ul>
      </div>
      <section className='flex items-start col-1 md:col-2 row-2 md:row-1 md:row-span-3'>
        <ul className='flex flex-col gap-2 text-2xl font-semibold text-white'>
          <li><Link href='/'>Inicio</Link></li>
          <li><Link href='/unidad'>Buscador de maquinarias y vehículos</Link></li>
          <li><Link href='/buscar?categoria=maquinas-ombu'>Maquinaria Ombú</Link></li>
          <li><Link href='/buscar?categoria=remolques'>Remolques</Link></li>
        </ul>
      </section>
      <div className="grid grid-cols-2 auto-rows-auto gap-y-2 bg-white col-1 md:col-3 row-3 md:row-1 md:row-span-2 h-fit w-fit p-2 ml-auto">
        <h2 className='flex h-fit items-center justify-center text-black text-xl font-semibold col-span-2'>Agente oficial</h2>
        <a href="https://pncremolques.com.ar" target="_blank" className='flex justify-center'>
          <Image
            loader={cdnLoader}
            width={384}
            height={122}
            loading='lazy'
            className="h-[55px] w-auto"
            alt="PNC remolques"
            src={"https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/pnc-logo.webp"}
          />
        </a>
        <a href="https://www.maquinasombu.com.ar/" target="_blank" className='flex justify-center'>
          <Image
            loader={cdnLoader}
            width={384}
            height={150}
            loading='lazy'
            className="h-[55px] w-auto"
            alt="Maquinarias agrícolas y remolques Ombú"
            src={"https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/ombu-logo.webp"}
          />
        </a>
      </div>
      <span className='col-1 md:col-3 row-5 md:row-3 ml-auto mt-auto pt-6 text-black text-base md:text-lg font-semibold h-fit w-fit'>
        Desarrollo x&nbsp;<a target='_blank' href='https://github.com/tisoler' className='underline-none font-bold text-lg md:text-xl'>Tisoler</a>&nbsp;| 2025
      </span>
    </footer>
  );
};

export default Footer;
