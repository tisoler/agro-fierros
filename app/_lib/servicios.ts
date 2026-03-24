import { unstable_cache } from "next/cache";
import { initPrecioMercado, PrecioMercado } from "../_modelos/precio";
import { Categoria, initCategoria } from "../_modelos/categoria";
import { initUnidad, Unidad } from "../_modelos/unidad";
import { Marca } from "../_modelos/marca";
import { CategoriaTipo, MarcaTipo, PrecioMercadoTipo, UnidadConMarca, UnidadConMarcaCategoria, UnidadConMarcaCategoriaDetallesImagenes } from "./tipos";
import { UnidadImagen } from "../_modelos/unidadImagen";
import { UnidadDetalle } from "../_modelos/unidadDetalle";
import { Op, Order } from "sequelize";
import { MAIZ, SOJA, TRIGO, USD_BLUE, USD_OFICIAL } from "./constantes";

const obtenerPreciosDolar = unstable_cache(
  async (): Promise<PrecioMercadoTipo[]> => {
    // DÓLAR desde API
    let dolares: PrecioMercadoTipo[] = [];
    try {
      const respDolar = await fetch('https://dolarapi.com/v1/dolares');
      if (!respDolar.ok) {
        console.error('Error obteniendo dólares desde dolarapi.');
      }

      const dataDolar = await respDolar.json() as Record<string, string>[];
      const dolarOficial = dataDolar.find(d => d.casa === 'oficial')?.venta;
      const dolarBlue = dataDolar.find(d => d.casa === 'blue')?.venta;

      dolares = [
        {
          id: 1,
          nombre: USD_OFICIAL,
          precio: isNaN(Number(dolarOficial)) ? 0 : Number(dolarOficial),
          activo: true,
          icono: 'dolarIcono'
        },
        {
          id: 2,
          nombre: USD_BLUE,
          precio: isNaN(Number(dolarBlue)) ? 0 : Number(dolarBlue),
          activo: true,
          icono: 'dolarIcono'
        },
      ];
    } catch (e) {
      console.error('Error obteniendo dólares desde dolarapi.', e);
    }

    return dolares;
  },
  ['precios-dolar'],
  { revalidate: 1800, tags: ['precios-dolar'] } // revalidar cada media hora
);

const obtenerPreciosCerelaes = unstable_cache(
  async (): Promise<PrecioMercadoTipo[]> => {
    // PRECIO CEREALEA desde API
    let preciosCereales: PrecioMercadoTipo[] = [];
    try {
      const respCereales = await fetch(
        'https://api.scrapingant.com/v2/general?url=https%3A%2F%2Fapi-cotizaciones.agrofy.com.ar%2Fapi%2FBoardPrices%2FGetBoardPricesHome&x-api-key=14386fc4e4b541be86dba7e78b7a7e12&proxy_type=residential&return_page_source=true'
      );
      if (!respCereales.ok) {
        console.error('Error obteniendo precios de cereales desde agrofy.');
      }
      const dataCereales = await respCereales.json() as { Productos: { Producto: string, Mercados: { Nombre: string, Precio: string }[]}[] }[];
      if (!dataCereales?.length && dataCereales[0]?.Productos) {
        console.error('Error obteniendo precios de cereales desde agrofy - No hay productos.');
      }
      preciosCereales = dataCereales[0]?.Productos
        ?.filter(cereal => [TRIGO, SOJA, 'Maiz'].includes(cereal.Producto))
        ?.map((cereal, idx) => {
          const nombre = cereal.Producto === TRIGO ? TRIGO : cereal.Producto === 'Maiz' ? MAIZ : SOJA;
          const icono = cereal.Producto === TRIGO ? 'trigoIcono' : cereal.Producto === 'Maiz' ? 'maizIcono' : 'sojaIcono';
          const precio = cereal.Mercados?.find(mercado => mercado.Nombre === 'Rosario')?.Precio?.replaceAll('.', '').replaceAll(',00', '') || 0;

          return ({
            id: 3 + idx,
            nombre: nombre,
            precio: isNaN(Number(precio)) ? 0 : Number(precio),
            activo: true,
            icono,
          })}
        ) || [];
    } catch (e) {
      console.error('Error obteniendo precios de cereales desde agrofy.', e);
    }

    return preciosCereales;
  },
  ['precios-cereales'],
  { revalidate: 10800, tags: ['precios-cereales'] } // revalidar cada 3 horas
);

export const obtenerPrecios = unstable_cache(
  async (): Promise<PrecioMercadoTipo[]> => {
    // DÓLAR desde API
    const dolares: PrecioMercadoTipo[] = await obtenerPreciosDolar();

    // PRECIO CEREALEA desde API
    const preciosCereales: PrecioMercadoTipo[] = await obtenerPreciosCerelaes();
  
    // fallback
    await initPrecioMercado();
    try {
      const precios = await PrecioMercado.findAll({
        where: { activo: true },
        order: [['id', 'ASC']],
      });

      if (!precios?.length) return [];
      const preciosPlano = precios.map(precio => {
        if (precio.nombre === USD_OFICIAL && dolares?.some(d => d.nombre === USD_OFICIAL)) {
          return dolares.find(d => d.nombre === USD_OFICIAL) as PrecioMercadoTipo;
        } else if (precio.nombre === USD_BLUE && dolares?.some(d => d.nombre === USD_BLUE)) {
          return dolares.find(d => d.nombre === USD_BLUE) as PrecioMercadoTipo;
        } else if (precio.nombre === TRIGO && preciosCereales?.some(d => d.nombre === TRIGO)) {
          return preciosCereales.find(d => d.nombre === TRIGO) as PrecioMercadoTipo;
        } else if (precio.nombre === SOJA && preciosCereales?.some(d => d.nombre === SOJA)) {
          return preciosCereales.find(d => d.nombre === SOJA) as PrecioMercadoTipo;
        } else if (precio.nombre === MAIZ && preciosCereales?.some(d => d.nombre === MAIZ)) {
          return preciosCereales.find(d => d.nombre === MAIZ) as PrecioMercadoTipo;
        }
        return precio.get({ plain: true })
      });
      return preciosPlano;
    } catch {
      console.error('Error obteniendo precios de mercado');
      return [];
    }
  },
  ['precios-mercado'],
  { revalidate: 1800, tags: ['precios-mercado'] } // revalidar cada media hora
);

export const obtenerCategorias = unstable_cache(
  async (): Promise<CategoriaTipo[]> => {
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
    try {
      await initUnidad();
      const unidades = await Unidad.findAll({
        include: [{ model: Marca, as: 'marca', attributes: ['id', 'nombre'] }],
        where: {
          esOportunidad: true,
          activa: true,
        },
        order: [['id', 'ASC']],
      });
      if (!unidades?.length) return [];
      return unidades.map(unidad => unidad.get({ plain: true })) as UnidadConMarca[];
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
    try {
      await initUnidad();
      const unidades = await Unidad.findAll({
        include: [{ model: Marca, as: 'marca', attributes: ['id', 'nombre'] }],
        where: {
          esNovedad: true,
          activa: true,
        },
        order: [['id', 'ASC']],
      });
      if (!unidades?.length) return [];
      return unidades.map(unidad => unidad.get({ plain: true })) as UnidadConMarca[];
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
    try {
      await initUnidad();
      const unidad = await Unidad.findOne({
        include: [
          { model: Marca, as: 'marca', attributes: ['id', 'nombre'] },
          { model: Categoria, as: 'categorias', attributes: ['id', 'titulo', 'slug', 'descripcion'] },
          { model: UnidadImagen, as: 'imagenes', separate: true, attributes: ['id', 'urlEscritorio', 'urlMobile', 'urlMini', 'textoAlt'] },
          { model: UnidadDetalle, as: 'detalles', separate: true, attributes: ['id', 'detalle'] },
        ],
        where: {
          slug,
          activa: true
        },
      });
      const unidadJson = unidad?.get({ plain: true }) || null;

      if (!unidadJson) {
        console.error('Unidad no encontrada');
        throw new Error('Unidad no encontrada');
      };
      return unidadJson as UnidadConMarcaCategoriaDetallesImagenes;
    } catch {
      console.error('Error obteniendo unidad por slug');
      return null;
    }
  },
  ['unidad', slug],
  { revalidate: 3600, tags: ['unidades'] } // revalidar cada 1 hora
);

export const obtenerRastroCategorias = (idCategoria: number) => unstable_cache(
  async (): Promise<CategoriaTipo[]> => {
    try {
      await initCategoria();
      const categorias = await Categoria.findAll({ raw: true });

      // Crear un mapa para búsquedas rápidas O(1)
      const categoriaMap = new Map<number, CategoriaTipo>();
      categorias.forEach(cat => categoriaMap.set(cat.id, cat));
  
      let idActual: number | null = idCategoria;
      const listaCategorias = [];

      while (idActual !== null) {
        const cat = categoriaMap.get(idActual);
        if (cat) {
          listaCategorias.push(cat);
        }
        idActual = cat?.idCategoriaPadre || null;

        if (listaCategorias.length > 10) break; // evitar loops infinitos
      }

      return listaCategorias;
    } catch {
      console.error('Error obteniendo rastro de categorías para id', idCategoria);
      return [];
    }
  },
  ['reastro-categorias', idCategoria?.toString()],
  { revalidate: 7200, tags: ['rastro-categorias'] } // revalidar cada 2 hora
);

const generarArbolCategorias = unstable_cache(
  async (categorias: Categoria[]): Promise<Record<number, CategoriaTipo[]>> => {
    // Crear estructura de árbol
    const arbol = categorias.reduce((acc, cat) => {
      const idCategoriaPadre = cat.idCategoriaPadre || -1;
      if (!acc[idCategoriaPadre]) acc[idCategoriaPadre] = [];
      acc[idCategoriaPadre].push(cat);

      return acc;
    }, {} as Record<number, CategoriaTipo[]>);

    return arbol;
  },
  ['generar-arbol-categorias'],
  { revalidate: 7200, tags: ['generar-arbol-categorias'] } // revalidar cada 2 hora
);

const obtenerCategoriasHijas = unstable_cache(
  async (categoriaSlug: string): Promise<string[]> => {
    await initCategoria();
    const categoriaConCategoriasHijasSlugs: string[] = [];
    const categorias = await Categoria.findAll({ raw: true });
    const categoriaPadre = categorias.find(cat => cat.slug === categoriaSlug);
    if (categoriaPadre) {
      const arbol = await generarArbolCategorias(categorias);
      
      // Función recursiva
      const recolectarHijos = (idPadre: number): string[] => {
        const hijos = arbol[idPadre] || [];
        return hijos.flatMap(hijo => [
          hijo.slug,
          ...recolectarHijos(hijo.id)
        ]);
      };
      
      categoriaConCategoriasHijasSlugs.push(categoriaPadre.slug, ...recolectarHijos(categoriaPadre.id));
    }
    return categoriaConCategoriasHijasSlugs;
  },
  ['categorias-hijas'],
  { revalidate: 7200, tags: ['categorias-hijas'] } // revalidar cada 2 hora
);

const obtenerTextoNormalizado = (texto: string) => {
  if (!texto?.trim()) return '';
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const DICCIONARIO_ORDER: { [key: string]: Order } = {
  categoria: [['categorias', 'titulo', 'ASC']],
  marca: [['marca', 'nombre', 'ASC']],
  unidad: [['titulo', 'ASC']],
}

export const obtenerUnidadBusqueda = (
  { terminoSlug, categoriaSlug, marcasSlug, ordenSlug }:
  { terminoSlug?: string, categoriaSlug?: string[], marcasSlug?: string[], ordenSlug?: string, }
) => {
  const idCategoriasSlug = Array.isArray(categoriaSlug) && categoriaSlug?.length > 0 ?  categoriaSlug.sort((a, b) => a.localeCompare(b))?.join('&') : 'todas';
  const idMarcasSlug = Array.isArray(marcasSlug) && marcasSlug?.length > 0 ?  marcasSlug.sort((a, b) => a.localeCompare(b))?.join('&') : 'todas';

  return unstable_cache (
    async (): Promise<{ unidadesFiltradas: UnidadConMarcaCategoria[], marcasFiltradas: MarcaTipo[] } | null> => {
      const categoriasString = categoriaSlug?.join(' | ') || '';
      const marcasString = marcasSlug?.join(' | ') || '';
      try {
        const instanciaSequelize = await initUnidad(); // Inicializamos Unidad porque contiene las relaciones marca <---> unidad <---> categoria

        // Obtener todas las categorías implicadas (categoría madre + categorías hijas)
        const categoriasHijasSlugsFuncional = categoriaSlug?.length 
          ? [...(await Promise.all(categoriaSlug.map(slug => obtenerCategoriasHijas(slug)))).flatMap(s => s)] 
          : [];

        let unidades: Unidad[] = [];
        
        const terminoBusqueda = obtenerTextoNormalizado(terminoSlug?.trim() || '');

        const includes = [
          { 
            model: Marca, 
            as: 'marca', 
            attributes: ['id', 'nombre', 'slug'],
            /*
            where: marcasSlug?.length ? {
              slug: { [Op.in]: marcasSlug },
            } : undefined,
            */
            required: true,
          },
          { 
            model: Categoria, 
            as: 'categorias', 
            attributes: ['id', 'titulo', 'slug'],
            where: categoriasHijasSlugsFuncional?.length ? {
              slug: { [Op.in]: categoriasHijasSlugsFuncional },
            } : undefined,
            required: true,
            through: { attributes: ['id'] },
          },
        ];

        const orderSeleccionado: Order | null = ordenSlug && DICCIONARIO_ORDER[ordenSlug]
          ? DICCIONARIO_ORDER[ordenSlug]
          : null;

        // 1 - Sin término de búsqueda
        // 2 - Términos es muy corto: LIKE simple
        if (!terminoBusqueda || terminoBusqueda.trim().length < 3) {
          unidades = await Unidad.findAll({
            include: includes,
            ...(terminoBusqueda ? { 
                where: {
                  [Op.or]: [
                    { titulo: { [Op.like]: `%${terminoBusqueda}%` } },
                    { descripcion: { [Op.like]: `%${terminoBusqueda}%` } },
                  ],
                  activa: true,
                }
              } : {
                where: {
                  activa: true,
                }
              }
            ),
            ...(orderSeleccionado && { order: orderSeleccionado }),
          });
        } else {
          const nombreTabla = Unidad.name; // Nombre generado dinámicamente, diferente en producción que en local (build vs dev)
          // 3 - Términos >= 3 caracteres: FULLTEXT
          unidades = await Unidad.findAll({
            attributes: {
              include: [
                [instanciaSequelize.literal(`MATCH(\`${nombreTabla}\`.\`titulo\`, \`${nombreTabla}\`.\`descripcion\`) AGAINST(:busqueda IN NATURAL LANGUAGE MODE)`), 'relevance']
              ]
            },
            include: includes,
            where: {
              [Op.and]: [
                instanciaSequelize.literal(`MATCH(\`${nombreTabla}\`.\`titulo\`, \`${nombreTabla}\`.\`descripcion\`) AGAINST(:busqueda IN NATURAL LANGUAGE MODE)`),
                { activa: true }
              ]
            },
            replacements: {
              busqueda: terminoBusqueda
            },
            having: { relevance: { [Op.gt]: 0 } },
            order: orderSeleccionado ? orderSeleccionado : [[instanciaSequelize.literal('relevance'), 'DESC']],
          });

          // 4 - Fallback - Si no hay resultados, buscar con LIKE simple (por si las dudas)
          if (!unidades?.length) {
            unidades = await Unidad.findAll({
              include: includes,
              where: {
                [Op.or]: [
                  { titulo: { [Op.like]: `%${terminoBusqueda}%` } },
                  { descripcion: { [Op.like]: `%${terminoBusqueda}%` } },
                ],
                activa: true,
              },
              ...(orderSeleccionado && { order: orderSeleccionado }),
            });
          }
        }

        const unidadesJson = unidades?.map(unidad => unidad.get({ plain: true })) || null;

        if (!unidadesJson) {
          console.error(`Error realizando búsqueda para: categorías ${categoriasString || 'ninguna'} y marcas ${marcasString || 'ninguna'} y orden ${ordenSlug || 'ninguno'} y término ${terminoSlug || 'ninguno'}`);
          throw new Error(`Error realizando búsqueda para: categorías ${categoriasString || 'ninguna'} y marcas ${marcasString || 'ninguna'} y orden ${ordenSlug || 'ninguno'} y término ${terminoSlug || 'ninguno'}`);
        };

        // Filtramos por marcas en este punto y no en el SELECT (DB) para poder obtener todas las marcas correspondientes al criterio de búsqueda "término" + "categorías"
        // De esta manera podemos seguir filtrando por otras marcas luego
        // Se devuelven las unidades filtradas (también por marcas) y todas las marcas correspondientes
        // Esto es para evitar replicar el filtro por término de búsqueda en obtenerMarcasParaCategoria
        const unidadesFiltradas = marcasSlug?.length
          ? unidadesJson.filter(u => marcasSlug.includes((u as UnidadConMarcaCategoria).marca.slug))
          : unidadesJson;
        const marcasFiltradas = [...(new Map((unidadesJson as UnidadConMarcaCategoria[])?.map(u => [u.marca.id, u.marca]))?.values() || [])];
        return { unidadesFiltradas: unidadesFiltradas as UnidadConMarcaCategoria[],  marcasFiltradas};
      } catch {
        console.error(`Error realizando búsqueda para: categorías ${categoriasString || 'ninguna'} y marcas ${marcasString || 'ninguna'} y orden ${ordenSlug || 'ninguno'} y término ${terminoSlug || 'ninguno'}`);
        return null;
      }
    },
    [
      'unidades', idCategoriasSlug, idMarcasSlug, terminoSlug?.trim() || 'sin-termino', ordenSlug?.trim() || 'sin-orden'],
    { revalidate: !terminoSlug ? 7200 : 300, tags: ['unidades-busqueda'] } // revalidar cada 2 hora para categorías + marcas, cada 5 minutos si hay término de búsqueda
  );
};

// REMOVER SI NO SE VUELVE A USAR PRONTO
export const obtenerMarcasParaCategoria = (categoriaSlug: string[]) => {
  const idCategoriasSlug = Array.isArray(categoriaSlug) && categoriaSlug?.length > 0 ?  categoriaSlug.sort((a, b) => a.localeCompare(b))?.join('&') : 'todas';

  return unstable_cache (
    async (): Promise<MarcaTipo[] | null> => {
      try {
        // Obtener todas las categorías implicadas (categoría madre + categorías hijas)
        const categoriasHijasSlugsFuncional = categoriaSlug.length
          ? [...(await Promise.all(categoriaSlug?.map(slug => obtenerCategoriasHijas(slug)))).flatMap(s => s)]
          : [];

        await initUnidad(); // Inicializamos Unidad porque contiene las relaciones marca <---> unidad <---> categoria
        const marcas = await Marca.findAll({
          include: [{ 
            model: Unidad,
            required: true,
            as: 'unidades',
            attributes: ['id'],
            include: [{
              model: Categoria,
              as: 'categorias',
              attributes: ['id'],
              where: categoriasHijasSlugsFuncional?.length ? {
                slug: { [Op.in]: categoriasHijasSlugsFuncional },
              } : undefined,
              through: { attributes: ['id'] },
            }],
          }],
        });

        const marcasJson = marcas?.map(marca => marca.get({ plain: true })) || null;

        if (!marcasJson) {
          console.error(`Error obteniendo marcas para categoría ${categoriaSlug || '-'}`);
          throw new Error(`Error obteniendo marcas para categoría ${categoriaSlug || '-'}`);
        }

        return marcasJson as MarcaTipo[];
      } catch (e) {
        console.error(`Error obteniendo marcas para categoría ${categoriaSlug || '-'}`, e);
        return null;
      }
    },
    ['marcas-categoria', idCategoriasSlug],
    { revalidate: 7200, tags: ['marcas-categoria'] } // revalidar cada 2 horas
  );
};

export const obtenerArbolCategorias = unstable_cache(
  async (): Promise<Record<number, CategoriaTipo[]> | null> => {
    try {
      await initCategoria();
      const categorias = await Categoria.findAll({ raw: true });
      if (!categorias?.length) {
        console.error('No se encontraron categorías para generar el árbol');
        return null;
      }
      const arbol = await generarArbolCategorias(categorias);
      return arbol;
    } catch (e) {
      console.error('Error obteniendo árbol de categorías', e);
      return null;
    }
  },
  ['arbol-categorias'],
  { revalidate: 7200, tags: ['arbol-categorias'] } // revalidar cada 2 hora
);
