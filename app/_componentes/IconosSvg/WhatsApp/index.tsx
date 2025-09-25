'use client';
import dynamic from 'next/dynamic';

const WhatsAppBoton = dynamic(() => import('./WhatsAppBoton'), {
  ssr: false,
});

const ContenedorWhatsAppBoton = ({ fijo }: { fijo?: boolean }) => <WhatsAppBoton fijo={fijo} />;

export default ContenedorWhatsAppBoton;
