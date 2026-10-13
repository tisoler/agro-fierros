-- Galería de unidad: orden explícito para el selector de /unidad/:slug.
-- La imagen de orden 0 es la destacada de la unidad (unidades.imagenDestacadaUrl).
-- Ejecutar una sola vez. Compatible hacia atrás (DEFAULT 0).

ALTER TABLE unidadImagenes
  ADD COLUMN orden INT NOT NULL DEFAULT 0 AFTER textoAlt;

-- Backfill: numerar 0..N por unidad según id (requiere MySQL 8+).
UPDATE unidadImagenes ui
JOIN (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY idUnidad ORDER BY id) - 1 AS rn
  FROM unidadImagenes
) t ON t.id = ui.id
SET ui.orden = t.rn;

CREATE INDEX idx_unidadImagenes_unidad_orden ON unidadImagenes (idUnidad, orden);
