'use client';
import { UnidadConMarcaCategoria } from "@/app/_lib/tipos";
import UnidadBuscador from "./unidadBusqueda";

const ListaBusqueda = ({ unidades, esDispositivoMovil }: { unidades: UnidadConMarcaCategoria[], esDispositivoMovil?: boolean }) => {
  return (
    <>
      {
        unidades?.map((unidad, idx) => (
          <UnidadBuscador key={idx} unidad={unidad} esDispositivoMovil={esDispositivoMovil} priorizar />
        ))
      }
    </>
  );
};

export default ListaBusqueda;
