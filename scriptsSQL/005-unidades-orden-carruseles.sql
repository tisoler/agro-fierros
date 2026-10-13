-- Orden manual de las tarjetas en los carruseles de Oportunidades y Novedades.
-- NULL = sin orden manual (va al final, por id como antes).
-- Ejecutar una sola vez con usuario con privilegios ALTER.

ALTER TABLE unidades
  ADD COLUMN ordenOportunidad INT NULL DEFAULT NULL AFTER monedaPrecio,
  ADD COLUMN ordenNovedad INT NULL DEFAULT NULL AFTER ordenOportunidad;
