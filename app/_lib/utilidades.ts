
export const cdnLoader = ({ src, width, quality = 75 }: { src: string, width: number, quality?: number }) => {
  return `${src}?w=${width}&q=${quality}`;
};

// Precio sin decimales con moneda explícita: "USD 45.000" o "$ 4.500.000".
// Solo llamar si hay precio.
export const formatearPrecio = (precio: number, moneda?: string) => {
  const monto = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(precio);
  return moneda === 'ARS' ? `$ ${monto}` : `USD ${monto}`;
};
