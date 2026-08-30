# AgroFierros

Portal de venta de maquinaria agrícola para la zona centro de Argentina.
Vendedores y concesionarias publican unidades sin costo fijo, con comisión
sobre ventas.

- Producción: `https://agrofierros.com.ar`
- Docs para agentes: [AGENTS.md](./AGENTS.md) (arquitectura y convenciones)
  y [DESIGN.md](./DESIGN.md) (sistema de diseño).

## Stack

Next.js 16 (App Router, `output: 'standalone'`) + React 19 + Tailwind CSS 4 +
Sequelize/MySQL + pnpm. Imágenes en CDN DigitalOcean Spaces. Deploy con Docker
+ nginx.

## Requisitos

- Node.js >= 22
- pnpm >= 10 (`corepack enable` si no lo tenés instalado)
- Acceso a la base MySQL (variables en `.env`)

## Desarrollo

```bash
cp .env.example .env   # o pedir el .env real
pnpm install
pnpm dev
```

Levanta en `http://localhost:3000` (el puerto puede ajustarse vía `PORT`).

## Scripts

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | servidor de desarrollo |
| `pnpm dev:turbo` | desarrollo con Turbopack |
| `pnpm build` | build de producción |
| `pnpm start` | servidor de producción |
| `pnpm lint` | ESLint |

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_BD_HOST` / `NEXT_PUBLIC_BD_PUERTO` | MySQL host/puerto |
| `NEXT_PUBLIC_BD_USUARIO` / `NEXT_PUBLIC_BD_PASSWORD` | credenciales MySQL |
| `NEXT_PUBLIC_BD_BASE` | nombre de la base |
| `REVALIDATION_SECRET` | secreto del endpoint `POST /api/revalidar` |

## Docker

```bash
docker-compose up --build -d   # ver comandos-docker
```

El `Dockerfile` es multi-stage y usa el build standalone de Next. En
producción nginx (`agrofierros.com.ar.conf`) rutea `/_next/static/` al CDN y
el resto al contenedor; QA usa `qa.agrofierros.com.ar.conf`.

## Admin

El panel interno (`agrofierros-admin`) es un proyecto Next.js separado que
corre en un subdominio, gestiona unidades y carruseles contra la misma base y
revalida la caché de la tienda vía `POST /api/revalidar`.
