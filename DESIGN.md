# DESIGN.md — Sistema de diseño AgroFierros

Identidad visual del portal. Regla de oro: **el naranja `#EA580C` es el color
de marca y no cambia**; la modernización pasa por neutros, compactez, radios y
sombras consistentes. Los tokens viven en `app/globals.css` dentro del bloque
`@theme` de Tailwind CSS 4.

## Paleta

### Marca (naranja)

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-color-marca` | `#EA580C` | Color principal: header, CTAs, acentos |
| `--color-marca-50` | `#FFF7ED` | Fondos muy suaves con tinte marca |
| `--color-marca-100` | `#FFEDD5` | Fondos de badges/chips de marca |
| `--color-marca-500` | `#F97316` | Hover de elementos marca |
| `--color-marca-600` | `#EA580C` | Alias de `color-marca` |
| `--color-marca-700` | `#C2410C` | Active/pressed de CTAs |
| `--color-marca-900` | `#7C2D12` | Texto marca sobre fondos claros |

### Secundario y neutros (slate)

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-color-sec-marca` | `#1E293B` (slate-800) | Texto fuerte, footer oscuro, "Ver más" desktop |
| `--color-color-fondo-gris` | `#F3F3F3` | Fondo de páginas de listado/detalle |
| slate-50/100/200/300 | escala Tailwind | Bordes, separadores, estados deshabilitados |
| slate-500/600 | escala Tailwind | Texto secundario/terciario |

### Semánticos (estados de unidad)

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-estado-nueva` | `#16A34A` | Badge "Nueva" |
| `--color-estado-usada` | `#1E293B` | Badge "Usada" |
| `--color-estado-oportunidad` | `#EA580C` | Badge "Oportunidad" |
| `--color-estado-vendida` | `#DC2626` | Badge "Vendida" / estado no disponible |

## Tipografía

- **Afacad Flux** (`--font-afacad-flux`): toda la interfaz, títulos y cuerpo.
  Precargada (`preload: true`) por ser la fuente dominante.
- **Geist Mono** (`--font-geist-mono`): datos tabulares, precios y cifras de
  mercado. Sin preload (uso secundario).
- Escala compacta: títulos de sección `text-lg`/`text-xl`, títulos de card
  `text-base`/`text-lg`, cuerpo `text-sm`/`text-base`. Evitar saltos mayores a
  2 pasos de escala entre elementos vecinos.

## Forma y elevación

| Token | Valor | Uso |
| --- | --- | --- |
| `--radius-card` | `0.75rem` | Cards de unidad y bloques de contenido |
| `--radius-chip` | `9999px` | Chips de filtro y badges |
| `--radius-btn` | `0.5rem` | Botones y controles |
| `--shadow-card` | sutil (`0 1px 3px rgb(15 23 42 / 0.08), 0 4px 12px rgb(15 23 42 / 0.06)`) | Cards en reposo |
| `--shadow-card-hover` | leve elevación al hover | Cards interactivas |

Compactez: paddings de card `p-3`/`p-4`, gaps entre elementos `gap-2`/`gap-3`,
secciones separadas por `py-6` a `py-10` (no más). Nada de sombras duras ni
bordes dobles.

## Componentes patrón

- **Card de unidad** (`unidadBusqueda`, `CarruselUnidad`): imagen 4:3 arriba,
  contenido abajo con título (1–2 líneas con truncado), marca en gris,
  badges de estado compactos y barra/botón "Ver más" al pie. Radio `--radius-card`,
  sombra `--shadow-card`, hover con `--shadow-card-hover`.
- **Botones**: primario naranja (`bg-color-marca`, texto blanco, hover
  `marca-500`, active `marca-700`); secundario slate (`bg-color-sec-marca`).
  Mínimo táctil 44px en mobile.
- **Chips de filtro**: fondo blanco, borde slate-300, activo con borde/texto
  marca y fondo `marca-50`. Chips activos con botón de quitar.
- **Skeletons**: fondo slate-200 con animación `sweep` existente; mismos radios
  que el componente real.
- **Header**: naranja marca, 60px, comportamiento hide-on-scroll. Logo + nombre
  a la izquierda, búsqueda y redes a la derecha.
- **Footer**: naranja marca con bloques de contacto/navegación.

## Responsive

Mobile-first, paridad mobile/desktop como requisito. Breakpoints: Tailwind por
defecto + `xs: 375px`. Las diferencias entre vistas deben resolverse con CSS
(grids, `hidden md:flex`, imágenes responsivas con `next/image`), nunca con
detección de user-agent en el servidor cuando la página es ISR.

## Accesibilidad

- Contraste AA: texto blanco sobre naranja marca solo en tamaños >= `text-sm`
  semibold; para texto largo usar slate-800 sobre blanco/gris.
- Foco visible (`focus-visible:ring-2 ring-color-marca`) en todo control
  interactivo.
- `alt` descriptivo en toda imagen de unidad (incluye marca y modelo).
