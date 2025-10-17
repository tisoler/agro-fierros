import { MetadataRoute } from 'next'
import { obtenerUnidadBusqueda } from './_lib/servicios'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const resultado = await obtenerUnidadBusqueda({})();
  
  const unidadesUrls = resultado?.unidadesFiltradas?.map((unidad) => ({
    url: `https://fabiotommasi.com.ar/unidad/${unidad.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  })) || [];

  return [
    // Página inicial
    { url: 'https://fabiotommasi.com.ar', priority: 1, lastModified: new Date() },
    // Página de búsqueda base
    { url: 'https://fabiotommasi.com.ar/buscar', priority: 0.3, lastModified: new Date() },
    // Páginas de unidades (dinámicas)
    ...unidadesUrls,
  ]
}
