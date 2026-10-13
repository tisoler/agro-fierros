-- Tabla para el carrusel principal de la home (gestionada desde agrofierros-admin)
CREATE TABLE IF NOT EXISTS `carruselHome` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `urlImagenDesktop` VARCHAR(255) NOT NULL,
  `urlImagenMobile` VARCHAR(255) NOT NULL,
  `textoAlt` VARCHAR(255) NOT NULL,
  `urlDestino` VARCHAR(255) NULL,
  `orden` INT NOT NULL DEFAULT 0,
  `activo` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
