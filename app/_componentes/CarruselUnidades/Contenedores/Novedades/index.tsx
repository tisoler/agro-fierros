import { obtenerUnidadesNovedades } from "@/app/_lib/servicios";
import CarruselUnidadesContenedor from "../..";
import { CarruselUnidadesProps } from "@/app/_lib/tipos";

const ContenedorCarruselNovedades = async (
  { titulo, variante = 'grande', esDispositivoMovil = true, priorizar = false }: Omit<CarruselUnidadesProps, 'unidades'>
) => {
  const unidades = await obtenerUnidadesNovedades();

  return (
    <CarruselUnidadesContenedor
      unidades={unidades}
      titulo={titulo}
      variante={variante}
      esDispositivoMovil={esDispositivoMovil}
      priorizar={priorizar}
    />
  );
};

export default ContenedorCarruselNovedades;
