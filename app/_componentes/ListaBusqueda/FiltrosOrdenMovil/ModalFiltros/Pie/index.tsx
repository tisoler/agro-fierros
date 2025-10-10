'use client';

const PieFiltros = () => {
  const cerrarFiltros = () => {
    // Evitar en el server
    if (!window) return;

    // Usamos JS y CSS porque no es posible manejarlo con un state de manera individual (categorías y marcas)
    // El div contenedor necesita estar en un server component app/_componentes/ListaBusqueda/FiltrosMovil/index.tsx y por tanto no puede acceder a un global state (Context API)
    // De mover el contenedor hacia adentro, debería colocarse en eun solo Suspense y el filtro de marcas bloquearía y redibujaría el de categorías
    const contenedor = document.getElementById('contenedorFiltrosMovil');
    if (!contenedor?.style) return;
    contenedor.style.display = 'none';
  }

  return (
    <button
      title="Aplicar filtros"
      className="ml-auto w-[122px] bg-color-marca active:bg-white border-1 border-color-marca active:border-neutral-800 text-white active:text-neutral-800 text-xl rounded px-2 py-1 font-semibold"
      onClick={cerrarFiltros}
    >
      Aplicar filtros
    </button>
  );
}

export default PieFiltros;
