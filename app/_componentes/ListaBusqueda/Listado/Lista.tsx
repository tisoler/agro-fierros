'use client';
import { MarcaTipo, UnidadConMarcaCategoria } from "@/app/_lib/tipos";
import UnidadBuscador from "./unidadBusqueda";
import { useContextoMarcas } from "@/app/_hooks/contextoMarcas";
import { useEffect } from "react";

const ListaBusqueda = ({ unidades, marcas, esDispositivoMovil }: { unidades: UnidadConMarcaCategoria[], marcas: MarcaTipo[], esDispositivoMovil?: boolean }) => {
  const { actualizarMarcas } = useContextoMarcas();

  useEffect(() => {
    actualizarMarcas(marcas);
  }, [marcas, actualizarMarcas]);

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
