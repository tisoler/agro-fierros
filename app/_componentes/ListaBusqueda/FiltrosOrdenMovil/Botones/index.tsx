'use client'; // Component client separado de los filtros que son componentes server y necesitan ejecutar server functions

const FiltrosMovilBotones = () => {
  const mostrarFiltros = () => {
    // Usamos JS y CSS porque no es posible manejarlo con un state de manera individual (categorías y marcas)
    // El div contenedor necesita estar en un server component app/_componentes/ListaBusqueda/FiltrosMovil/index.tsx y por tanto no puede acceder a un global state (Context API)
    // De mover el contenedor hacia adentro, debería colocarse en eun solo Suspense y el filtro de marcas bloquearía y redibujaría el de categorías
    const contenedor = document.getElementById('contenedorFiltrosMovil');
    if (!contenedor?.style) return;
    contenedor.style.display = 'flex';
  };

  const mostrarOrden = () => {
    // Usamos JS y CSS porque no es posible manejarlo con un state de manera individual (categorías y marcas)
    // El div contenedor necesita estar en un server component app/_componentes/ListaBusqueda/FiltrosMovil/index.tsx y por tanto no puede acceder a un global state (Context API)
    // De mover el contenedor hacia adentro, debería colocarse en eun solo Suspense y el filtro de marcas bloquearía y redibujaría el de categorías
    const contenedor = document.getElementById('contenedorOrdenMovil');
    if (!contenedor?.style) return;
    contenedor.style.display = 'flex';
  };

  return (
    <section className="flex w-full px-2 md:hidden bg-white">
      <button className="flex items-center justify-center gap-2 w-full h-full text-neutral-800 text-xl border-r-1 border-r-color-fondo-gris px-2 py-3 active:bg-neutral-200" onClick={mostrarOrden}>
        Ordenar
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
        </svg>
      </button>
      <button className="flex items-center justify-center gap-2 w-full h-full text-neutral-800 text-xl border-l-1 border-l-color-fondo-gris px-2 py-3 active:bg-neutral-200" onClick={mostrarFiltros}>
        Filtrar
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
        </svg>
      </button>
    </section>
  );
};

export default FiltrosMovilBotones;
