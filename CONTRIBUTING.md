# Contributing Guide

## Setup Local

```bash
git clone <repo>
cd autopart-mackertplace-front
npm install
```

## Agregar Nueva Pantalla

1. Crear archivo en `apps/web/app/<ruta>/page.tsx`
2. Si requiere auth: wrappear con `<RoleGuard allow={["BUYER"]}>`
3. Si requiere datos: usar hook en `apps/web/hooks/`

## Agregar Nuevo Servicio

1. Crear `apps/web/services/<modulo>.service.ts`
2. Funciones que llamen `apiFetch(endpoint, {method, auth, body})`
3. Crear hook en `apps/web/hooks/use<Modulo>.ts`

## Testing

```bash
npm run lint:web
npm run build:web
```

## Endpoints

Ver `packages/shared/src/endpoints.ts`

## Stack

- Next.js 16 + React 19 + TypeScript 5
- TailwindCSS 4 + Zustand 5 + React Query 5
- React Hook Form + Zod
- Socket.io (realtime)

## Branches

- `main` - production
- `develop` - staging
- `feature/*` - features nuevas
