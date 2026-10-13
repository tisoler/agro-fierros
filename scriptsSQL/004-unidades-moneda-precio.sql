-- Precio en pesos o dólares: la columna precioDolar guarda el monto en la
-- moneda indicada por monedaPrecio ('USD' por defecto, conserva lo actual).
-- Ejecutar una sola vez con usuario con privilegios ALTER.

ALTER TABLE unidades
  ADD COLUMN monedaPrecio VARCHAR(3) NOT NULL DEFAULT 'USD' AFTER precioDolar;
