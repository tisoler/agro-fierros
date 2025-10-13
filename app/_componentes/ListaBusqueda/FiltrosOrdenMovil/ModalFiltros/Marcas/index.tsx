'use client';
import { useContextoMarcas } from "@/app/_hooks/contextoMarcas";
import FiltroMarcas from "./filtroMarcas";

const FiltroMarcasContenedor = ({ marcasSlug }: { marcasSlug: string[] }) => {
  const { marcas } = useContextoMarcas();

  return (
    <FiltroMarcas marcas={marcas || []} marcasSlug={marcasSlug} />
  );
};

export default FiltroMarcasContenedor;
