import { BusquedaProps } from "@/app/_lib/tipos";
import ListaBusqueda from "./Listado";
import ListaDesplegableOrden from "./FiltrosOrdenEscritorio/ListaDesplegableOrden";
import { Suspense } from "react";
import SkeletonListaBusqueda from "../Skeletons/ListaBusqueda";

const PanelListaBusqueda = ({
	categoriaSlug,
	marcasSlug,
	terminoSlug,
	ordenSlug,
	idCategoriasSlug,
	idMarcasSlug,
	esDispositivoMovil = true,
}: BusquedaProps & { idCategoriasSlug: string, idMarcasSlug: string }) => {
	return (
		<section className="w-full flex flex-col items-end gap-2">
			<ListaDesplegableOrden ordenSlug={ordenSlug} />
      { /* Es relative para el div que muestra el mensaje que indica que no hay resultados de búsqueda */ }
			<div className="relative w-full grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] justify-items-start gap-4 min-h-[40vh]">
				{ /* El key en Suspense es importante para que al cambiar la url se regenere el componente, de lo contrario el componente ya está montado y no se cargo el skeleton */ }
				<Suspense key={`${idCategoriasSlug}-${idMarcasSlug}-${terminoSlug?.trim() || 'sin-termino'}-${ordenSlug?.trim() || 'sin-termino'}`} fallback={<SkeletonListaBusqueda />}>
					<ListaBusqueda
						categoriaSlug={categoriaSlug}
						marcasSlug={marcasSlug}
						terminoSlug={terminoSlug}
						ordenSlug={ordenSlug}
						esDispositivoMovil={esDispositivoMovil}
					/>
				</Suspense>
			</div>
		</section>
	);
};

export default PanelListaBusqueda;
