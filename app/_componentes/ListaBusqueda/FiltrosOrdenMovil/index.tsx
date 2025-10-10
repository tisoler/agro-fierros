import FiltrosMovilBotones from "./Botones";
import ModalFiltrosMovil from "./ModalFiltros";
import ModalOrdenMovil from "./ModalOrden";

type FiltrosOrdenMovilProps = {
  categoriaSlug: string[],
  marcasSlug: string[],
  ordenSlug: string,
  idCategoriasSlug: string
  idMarcasSlug: string,
};

const FiltrosOrdenMovil = ({
  categoriaSlug,
  marcasSlug,
  ordenSlug,
  idCategoriasSlug,
  idMarcasSlug,
}: FiltrosOrdenMovilProps) => {
  return (
    <section className="w-full flex flex-col items-center px-1 md:hidden">
      <FiltrosMovilBotones />
      <ModalFiltrosMovil
        categoriaSlug={categoriaSlug}
        marcasSlug={marcasSlug}
        idCategoriasSlug={idCategoriasSlug}
        idMarcasSlug={idMarcasSlug}
      />
      <ModalOrdenMovil ordenSlug={ordenSlug} />
    </section>
  );
};

export default FiltrosOrdenMovil;
