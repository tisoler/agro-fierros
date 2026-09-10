import { VENDIDA } from "@/app/_lib/constantes";

type CintaVendidaProps = {
  tamanio?: 'chica' | 'grande';
};

const CintaVendida = ({ tamanio = 'chica' }: CintaVendidaProps) => {
  const estilosCinta = tamanio === 'grande'
    ? 'bottom-[32px] -right-[62px] w-[230px] py-1.5 text-sm md:text-base'
    : 'bottom-[22px] -right-[44px] w-[160px] py-1 text-xs md:text-sm';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className={`
          absolute -rotate-45
          bg-estado-vendida text-center
          font-bold uppercase tracking-[0.15em] text-white shadow-md
          ${estilosCinta}
        `}
      >
        {VENDIDA}
      </div>
    </div>
  );
};

export default CintaVendida;
