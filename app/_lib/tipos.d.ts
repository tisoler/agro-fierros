import { InferAttributes } from "sequelize";
import { Unidad } from "../_modelos/unidad";
import { Marca } from "../_modelos/marca";
import { Categoria } from "../_modelos/categoria";
import { UnidadDetalle, UnidadImagen } from "../_modelos/unidadImagen";
import { PrecioMercado } from "../_modelos/precio";

export type UnidadTipo = InferAttributes<Unidad, { omit: never; }>;
export type UnidadConMarca = InferAttributes<Unidad, { omit: never; }> & { marca?: InferAttributes<Marca, { omit: never; }> };
export type UnidadConMarcaCategoria = UnidadConMarca & { categoria?: InferAttributes<Categoria, { omit: never; }> };
export type UnidadConMarcaCategoriaDetalles = UnidadConMarcaCategoria & { detalles?: InferAttributes<UnidadDetalle, { omit: never; }>[] };
export type UnidadConMarcaCategoriaDetallesImagenes = UnidadConMarcaCategoriaDetalles & { imagenes?: InferAttributes<UnidadImagen, { omit: never; }>[] };
export type CategoriaTipo = InferAttributes<Categoria, { omit: never; }>;
export type PrecioMercadoTipo = InferAttributes<PrecioMercado, { omit: never; }>;
