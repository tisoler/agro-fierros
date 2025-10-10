import { InferAttributes } from "sequelize";
import { Unidad } from "../_modelos/unidad";
import { Marca } from "../_modelos/marca";
import { Categoria } from "../_modelos/categoria";
import { UnidadDetalle, UnidadImagen } from "../_modelos/unidadImagen";
import { PrecioMercado } from "../_modelos/precio";
import { OPCIONES_ORDEN } from './constantes';

export type UnidadTipo = InferAttributes<Unidad, { omit: never; }>;
export type UnidadConMarca = InferAttributes<Unidad, { omit: never; }> & { marca: InferAttributes<Marca, { omit: never; }> };
export type UnidadConMarcaCategoria = UnidadConMarca & { categorias: InferAttributes<Categoria, { omit: never; }>[] };
export type UnidadConMarcaCategoriaDetalles = UnidadConMarcaCategoria & { detalles?: InferAttributes<UnidadDetalle, { omit: never; }>[] };
export type UnidadConMarcaCategoriaDetallesImagenes = UnidadConMarcaCategoriaDetalles & { imagenes?: InferAttributes<UnidadImagen, { omit: never; }>[] };
export type CategoriaTipo = InferAttributes<Categoria, { omit: never; }>;
export type PrecioMercadoTipo = InferAttributes<PrecioMercado, { omit: never; }>;
export type MarcaTipo = InferAttributes<Marca, { omit: never; }>;

export type BusquedaProps = {
  categoriaSlug: string[],
  marcasSlug: string[],
  terminoSlug: string,
  ordenSlug: string,
  esDispositivoMovil?: boolean,
}

export type OpcionOrden = keyof typeof OPCIONES_ORDEN;

export type CarruselUnidadesProps = {
  unidades: UnidadConMarca[];
  titulo: string,
  variante?: 'grande' | 'chico';
  esDispositivoMovil?: boolean;
  priorizar?: boolean;
}
