'use client';
import { MarcaTipo } from "../_lib/tipos";
import { createContext, ReactNode, useContext, useState } from "react";

type ContextoMarcas = {
  marcas: MarcaTipo[],
  actualizarMarcas: (valores: MarcaTipo[]) => void,
};

const Contexto = createContext<ContextoMarcas>({
  marcas: [],
  actualizarMarcas: (valores: MarcaTipo[]) => {},
});

export const useContextoMarcas = () => useContext(Contexto);

const ProveedorMarcas = ({ children }: { children: ReactNode }) => {
  const [marcas, setMarcas] = useState<MarcaTipo[]>([]);

  const actualizarMarcas = (valores: MarcaTipo[]) => {
    setMarcas(valores);
  };

  return (
    <Contexto.Provider value={{ marcas, actualizarMarcas }}>
      {children}
    </Contexto.Provider>
  );
};

export default ProveedorMarcas;
