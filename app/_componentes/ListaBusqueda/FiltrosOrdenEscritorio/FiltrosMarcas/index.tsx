'use client';
import FiltroMarcas from "./filtroMarcas";
import { useContextoMarcas } from "@/app/_hooks/contextoMarcas";

const FiltroMarcasContenedor = ({ marcasSlug }: { marcasSlug: string[] }) => {
  const { marcas } = useContextoMarcas();

  return (
    <FiltroMarcas marcas={marcas || []} marcasSlug={marcasSlug} />
  );
};

export default FiltroMarcasContenedor;
