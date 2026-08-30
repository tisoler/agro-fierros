
export const cdnLoader = ({ src, width, quality = 75 }: { src: string, width: number, quality?: number }) => {
  return `${src}?w=${width}&q=${quality}`;
};

// Precio en dólares sin decimales (ej: "US$ 45.000"). Solo llamar si hay precio.
export const formatearPrecioDolar = (precio: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(precio);
};
