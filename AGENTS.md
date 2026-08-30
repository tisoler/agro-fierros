# AGENTS.md — AgroFierros

Guía para agentes de IA (y humanos) que trabajen en este repositorio.
Para el sistema de diseño visual ver [DESIGN.md](./DESIGN.md).

## Producto

AgroFierros es un portal de venta de maquinaria agrícola para la zona centro de
Argentina (`https://agrofierros.com.ar`). Vendedores y concesionarias publican
unidades sin costo fijo, con comisión sobre ventas. La conversión pasa por
contacto directo (WhatsApp), por eso el SEO y el rendimiento server-side son la
prioridad técnica número uno.

Existe un panel de administración interno (`agrofierros-admin`, subdominio,
proyecto separado) que gestiona unidades y carruseles de la home contra la
misma base de datos.

## Stack

| Pieza | Tecnología |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19, TypeScript |
| Estilos | Tailwind CSS 4 (tokens en `@theme` dentro de `app/globals.css`) |
| ORM / BD | Sequelize 6 + MySQL (`mysql2`) |
| Imágenes | CDN DigitalOcean Spaces + optimizador `next/image` |
| Empaquetado | pnpm (lockfile `pnpm-lock.yaml`) |
| Deploy | Docker (`output: 'standalone'`) + nginx + Let's Encrypt |

## Estructura del código

- `app/_componentes/` — componentes UI, organizados por bloque funcional
  (Encabezado, Footer, Carrusel*, ListaBusqueda, Unidad, Skeletons, ...).
  Cada bloque suele tener su carpeta con `index.tsx` de export.
- `app/_lib/` — `servicios.ts` (acceso a datos cacheado), `sequelize.ts`
  (conexión), `constantes.ts`, `utilidades.ts`, `tipos.d.ts`.
- `app/_modelos/` — modelos Sequelize (`unidad`, `marca`, `categoria`,
  `precio`, `unidadImagen`, `unidadDetalle`, `carruselHome`).
- `app/_hooks/` — estado de cliente (p. ej. `contextoMarcas`).
- `app/api/revalidar/route.ts` — endpoint de revalidación bajo demanda.
- `scriptsSQL/` — utilidades SQL/HTML de carga inicial.

## Convenciones

- **Idioma**: código, identificadores y commits en español
  (`obtenerUnidadPorSlug`, `esOportunidad`, `ListaBusqueda`).
- Las páginas (`app/page.tsx`, `app/buscar/page.tsx`, `app/unidad/[slug]/page.tsx`)
  son delgadas: delegan en un `Componente*Pagina`.
- Los componentes de página son server components; solo se marca
  `'use client'` cuando hay estado/eventos.
- Prefijos de carpeta `_` = no ruteables por Next.js.

## Modelo de datos y flujo

`Marca 1—N Unidad N—M Categoria`, con `UnidadImagen` y `UnidadDetalle`
asociados a `Unidad`. Relaciones definidas en `initUnidad()` de
`app/_modelos/unidad.ts`. La tabla `carruselHome` alimenta el carrusel
principal de la home (fallback hardcodeado si está vacía).

Flujo: páginas → `servicios.ts` → Sequelize → MySQL. Nunca consultar la BD
desde componentes.

## Estrategia de caché (crítica, respetar)

- Todo acceso a datos pasa por `unstable_cache` en `app/_lib/servicios.ts`,
  con **tags** (`unidades`, `categorias`, `precios-mercado`, ...) y tiempos de
  `revalidate` ya definidos por servicio.
- Páginas con ISR: home y unidad `revalidate = 7200`, búsqueda `3600`.
- No usar `headers()`, `cookies()` ni `searchParams` variables en el render de
  la página si eso fuerza render dinámico y anula el ISR. El estado de filtros
  de búsqueda vive en la URL (`/buscar?categoria=&marca=&termino=&orden=`).
- Tras un cambio de datos (p. ej. desde el admin), revalidar llamando a
  `POST /api/revalidar` con `{ secret, path?, tags? }` donde `secret` debe
  coincidir con `REVALIDATION_SECRET`. Tags habituales: `unidades`,
  `categorias`, `carrusel-home`.

## Búsqueda

`obtenerUnidadBusqueda` en `servicios.ts` implementa el flujo:
términos < 3 caracteres usan `LIKE`; >= 3 usan `FULLTEXT`
(`MATCH ... AGAINST` sobre `titulo, descripcion`) con fallback `LIKE`.
El filtro por marca se aplica en memoria tras la consulta para poder devolver
también el listado de marcas disponibles. La caché keyea por combinación de
categorías/marcas/término/orden.

## SEO (reglas duras)

- `canonical` siempre por página y con sus parámetros estables
  (p. ej. `/unidad/[slug]` incluye el slug).
- La metadata dinámica de unidad usa `titulo`/`descripcion` reales de la BD,
  nunca el slug crudo.
- Datos estructurados JSON-LD: `Product`+`Offer`+`BreadcrumbList` en unidad,
  `Organization` en home, `CollectionPage`+`BreadcrumbList` en `/buscar`.
- `sitemap.ts` y `robots.txt` en `app/` y `public/`.
- Imágenes con `next/image` y `alt` descriptivo; el dominio del CDN está
  permitido en `next.config.ts`.

## Comandos

```bash
pnpm install        # dependencias (lockfile pnpm-lock.yaml)
pnpm dev            # desarrollo
pnpm build          # build de producción (standalone)
pnpm start          # servidor de producción
pnpm lint           # eslint
```

Variables de entorno (`.env`, no commitear): `NEXT_PUBLIC_BD_HOST`,
`NEXT_PUBLIC_BD_PUERTO`, `NEXT_PUBLIC_BD_USUARIO`, `NEXT_PUBLIC_BD_PASSWORD`,
`NEXT_PUBLIC_BD_BASE`, `REVALIDATION_SECRET`.

## Deploy

- `Dockerfile` multi-stage: builder instala con pnpm (corepack) y el runner
  usa `output: 'standalone'` (`node server.js`).
- `docker-compose.yml` define el servicio con límites de memoria.
- nginx: `agrofierros.com.ar.conf` (prod) y `qa.agrofierros.com.ar.conf` (QA);
  `/_next/static/` va al CDN, resto al contenedor.
- Ver `comandos-docker` para el ciclo básico de contenedores.

## No hacer

- No agregar `headers()`/`cookies()` en páginas que deben ser ISR.
- No duplicar consultas a BD fuera de `servicios.ts`.
- No cambiar los tags de caché sin actualizar el flujo de revalidación del admin.
- No mezclar inglés/español en identificadores nuevos.
