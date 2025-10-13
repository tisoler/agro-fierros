'use client';
import { UnidadConMarcaCategoria } from "@/app/_lib/tipos";
import UnidadBuscador from "./unidadBusqueda";
import { useContextoMarcas } from "@/app/_hooks/contextoMarcas";
import { useEffect } from "react";

const ListaBusqueda = ({ unidades, esDispositivoMovil }: { unidades: UnidadConMarcaCategoria[], esDispositivoMovil?: boolean }) => {
  const { actualizarMarcas } = useContextoMarcas();

  useEffect(() => {
    actualizarMarcas([...new Map(unidades.map(u => [u.marca.id, u.marca])).values()]);
  }, [unidades]);

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
