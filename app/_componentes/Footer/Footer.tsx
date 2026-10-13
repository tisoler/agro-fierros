'use client';
import Image from 'next/image';
import Link from 'next/link';

const ENLACES = [
  { href: '/', texto: 'Inicio' },
  { href: '/buscar?categoria=todas', texto: 'Buscador de maquinarias y vehículos' },
  { href: '/buscar?categoria=maquinas-ombu', texto: 'Maquinaria Ombú' },
  { href: '/buscar?categoria=remolques', texto: 'Remolques' },
];

const Footer = () => {
  return (
    <footer className='w-full bg-color-marca px-4 md:px-20 pt-8 pb-5'>
      <div className='mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 md:flex-row md:items-start md:justify-between'>
        <Link href='/' prefetch={false} title='AgroFierros - Inicio' className='shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded'>
          <Image alt='AgroFierros - Inicio' loading='lazy' src='/logos/agrofierros-monocromo.svg' width={180} height={37} />
        </Link>
        <nav aria-label='Navegación del sitio'>
          <ul className='flex flex-col items-center md:items-start gap-1.5 text-sm md:text-base font-semibold text-white'>
            {ENLACES.map((enlace) => (
              <li key={enlace.href + enlace.texto}>
                <Link prefetch={false} className='hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded' href={enlace.href}>
                  {enlace.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className='flex flex-col items-center md:items-end gap-2'>
          <p className='text-white text-sm font-semibold uppercase tracking-wide'>Redes sociales</p>
          <ul className='flex gap-3'>
            <li>
              <a href='https://www.instagram.com/fabiotommasi83/' target='_blank' title='Instagram' className='underline'>
                <Image width={20} height={20} loading='lazy' alt="Instagram" src={'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrofierros/genericas/instagram.svg'} />
              </a>
            </li>
            <li>
              <a href='https://www.facebook.com/fabio.tommasi.520' target='_blank' title='Facebook' className='underline'>
                <Image width={20} height={20} loading='lazy' alt="Facebook" src={'https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrofierros/genericas/facebook.svg'} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='mx-auto mt-6 flex w-full max-w-[1200px] items-center justify-between border-t border-white/30 pt-3 text-xs md:text-sm text-white/90'>
        <span>© 2026 AgroFierros</span>
        <span>
          Desarrollo x&nbsp;<a target='_blank' href='https://github.com/tisoler' className='font-bold underline'>Tisoler</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
