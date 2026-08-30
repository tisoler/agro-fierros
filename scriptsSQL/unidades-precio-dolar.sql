-- Precio opcional en dólares para las unidades.
-- Migración: ejecutar manualmente sobre la base de la tienda.
ALTER TABLE unidades
  ADD COLUMN precioDolar INT NULL;
