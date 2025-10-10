'use client';

const EncabezadoFiltros = () => {
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
    <div className="flex justify-between items-center">
      <div className="w-[80px] flex">
        <button
          aria-label="Cerrar filtros"
          title="Cerrar filtros"
          className="flex justify-center items-center w-[38px] h-[38px] rounded-full active:bg-neutral-300 active:text-white"
          onClick={cerrarFiltros}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <h2 className="text-2xl font-semibold text-center">Filtros</h2>
      <button
        title="Aplicar filtros"
        className="w-[122px] bg-color-marca active:bg-white border-1 border-color-marca active:border-neutral-800 text-white active:text-neutral-800 text-xl rounded px-2 py-1 font-semibold"
        onClick={cerrarFiltros}
      >
        Aplicar filtros
      </button>
    </div>
  );
}

export default EncabezadoFiltros;
