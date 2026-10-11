# Autoparts Marketplace Frontend

## Requisitos
- Node.js 18+
- npm 9+

## Instalación

```bash
npm install
```

## Desarrollo

### Web (Next.js)
```bash
cd apps/web
npm install
cp .env.example .env
npm run dev
```
Abre http://localhost:3000

### Mobile (Expo)
```bash
cd apps/mobile
npm install
cp .env.example .env
npm start
```

## Lint
```bash
npm run lint:web
```

## Build
```bash
npm run build:web
```

## Estructura

- `apps/web` - Next.js 16 web app
- `apps/mobile` - Expo React Native base
- `packages/shared` - Tipos compartidos

## Documentación

Ver [README.md](./README.md), [PHASES_1_5_COMPLETE.md](./PHASES_1_5_COMPLETE.md), [PROJECT_STATUS.md](./PROJECT_STATUS.md)
