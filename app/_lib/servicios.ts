import { unstable_cache } from "next/cache";
import { initPrecioMercado, PrecioMercado } from "../_modelos/precio";
import { Categoria, initCategoria } from "../_modelos/categoria";
import { initUnidad, Unidad } from "../_modelos/unidad";
import { Marca } from "../_modelos/marca";
import { CategoriaTipo, PrecioMercadoTipo, UnidadConMarca, UnidadConMarcaCategoria } from "./tipos";
import { UnidadImagen } from "../_modelos/unidadImagen";
import { UnidadDetalle } from "../_modelos/unidadDetalle";
export const obtenerPrecios = unstable_cache(
  async (): Promise<PrecioMercadoTipo[]> => {
    'use server';
    /*
    const response = await fetch('https://dolarapi.com/v1/dolares')
    if (!response.ok) {
      return [
        { nombre: 'Dólar Oficial', precio: 0, icono: 'dolarIcono' }, 
        { nombre: 'Dólar Blue', precio: 0, icono: 'dolarIcono'  }
      ];
    }

    const data = await response.json() as Record<string, string>[];
    const dolarOficial = data.find(d => d.casa === 'oficial')?.venta;
    const dolarBlue = data.find(d => d.casa === 'blue')?.venta;

    return [
      { nombre: 'Dólar Oficial', precio: isNaN(Number(dolarOficial)) ? 0 : Number(dolarOficial), icono: 'dolarIcono' },
      { nombre: 'Dólar Blue', precio: isNaN(Number(dolarBlue)) ? 0 : Number(dolarBlue), icono: 'dolarIcono' }
    ];
    */
    await initPrecioMercado();
    try {
      const precios = await PrecioMercado.findAll({
        where: { activo: true },
        order: [['id', 'ASC']],
      });

      if (!precios?.length) return [];
      return precios.map(precio => precio.get({ plain: true }));
    } catch {
      console.error('Error obteniendo precios de mercado');
      return [];
    }
  },
  ['precios-mercado'],
  { revalidate: 3600, tags: ['precios-mercado'] } // revalidar cada 1 hora
);

export const obtenerCategorias = unstable_cache(
  async (): Promise<CategoriaTipo[]> => {
    'use server';
    try {
      await initCategoria();
      const categorias = await Categoria.findAll({
        where: {
          mostrarHome: true,
        },
        order: [['id', 'ASC']],
        raw: true,
      });
      if (!categorias?.length) return [];
      return categorias;
    } catch {
      console.error('Error obteniendo categorías');
      return [];
    }
  },
  ['categorias'],
  { revalidate: 7200, tags: ['categorias'] } // revalidar cada 2 horas
);

export const obtenerUnidadesOportunidades = unstable_cache(
  async (): Promise<UnidadConMarca[]> => {
    'use server';
    try {
      await initUnidad();
      const unidades = await Unidad.findAll({
        include: [{ model: Marca, as: 'marca', attributes: ['id', 'nombre'] }],
        where: {
          esOportunidad: true,
        },
        order: [['id', 'ASC']],
      });
      if (!unidades?.length) return [];
      return unidades.map(unidad => unidad.get({ plain: true }));
    } catch {
      console.error('Error obteniendo oportunidades');
      return [];
    }
  },
  ['unidades-oportunidades'],
  { revalidate: 3600, tags: ['unidades'] } // revalidar cada 1 hora
);

export const obtenerUnidadesNovedades = unstable_cache(
  async (): Promise<UnidadConMarca[]> => {
    'use server';
    try {
      await initUnidad();
      const unidades = await Unidad.findAll({
        include: [{ model: Marca, as: 'marca', attributes: ['id', 'nombre'] }],
        where: {
          esNovedad: true,
        },
        order: [['id', 'ASC']],
      });
      if (!unidades?.length) return [];
      return unidades.map(unidad => unidad.get({ plain: true }));;
    } catch {
      console.error('Error obteniendo novedades');
      return [];
    }
  },
  ['unidades-novedades'],
  { revalidate: 3600, tags: ['unidades'] } // revalidar cada 1 hora
);

export const obtenerUnidadPorSlug = (slug: string) => unstable_cache(
  async (): Promise<UnidadConMarcaCategoria | null> => {
    'use server';
    try {
      await initUnidad();
      const unidad = await Unidad.findOne({
        include: [
          { model: Marca, as: 'marca', attributes: ['id', 'nombre'] },
          { model: Categoria, as: 'categoria', attributes: ['id', 'titulo'] },
          { model: UnidadImagen, as: 'imagenes', separate: true, attributes: ['id', 'urlEscritorio', 'urlMobile', 'urlMini', 'textoAlt'] },
          { model: UnidadDetalle, as: 'detalles', separate: true, attributes: ['id', 'detalle'] },
        ],
        where: { slug },
      });
      const unidadJson = unidad?.toJSON();

      if (!unidadJson) {
        console.error('Unidad no encontrada');
        throw new Error('Unidad no encontrada');
      };
      return unidadJson;
    } catch {
      console.error('Error obteniendo unidad por id');
      return null;
    }
  },
  [`unidad-${slug}`],
  { revalidate: 3600, tags: ['unidades'] } // revalidar cada 1 hora
);

export const obtenerRastro = (idUCategoria: number) => unstable_cache(
  async (): Promise<CategoriaTipo[]> => {
    'use server';
    try {
      await initCategoria();
      const categorias = await Categoria.findAll({ raw: true });

      // Crear un mapa para búsquedas rápidas O(1)
      const categoriaMap = new Map<number, CategoriaTipo>();
      categorias.forEach(cat => categoriaMap.set(cat.id, cat));
  
      let idActual: number | null = idUCategoria;
      const listaCategorias = [];

      while (idActual) {
        const cat = categoriaMap.get(idActual);
        if (cat) {
          listaCategorias.push(cat);
        }
        idActual = cat?.idCategoriaPadre || null;
      }

      return listaCategorias;
    } catch {
      console.error('Error obteniendo rastro de categorías para id', idUCategoria);
      return [];
    }
  },
  [`reastro-categorias-${idUCategoria}`],
  { revalidate: 7200, tags: ['rastro-categorias'] } // revalidar cada 2 hora
);
