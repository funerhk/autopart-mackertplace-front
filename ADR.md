# Architecture Decision Records (ADR)

## ADR-001: Monorepo Structure

**Decisión**: Usar monorepo con workspaces (web, mobile, shared)

**Razón**:
- Comparte tipos entre web y mobile
- Un único repositorio para sincronizar cambios
- Facilita reutilización de servicios y hooks

**Trade-offs**:
- Más complejidad en build
- Requiere coordinación de dependencias
- Beneficio: DRY principle

---

## ADR-002: State Management con Zustand

**Decisión**: Zustand para auth store en lugar de Context API o Redux

**Razón**:
- Lightweight y performante
- Fácil de usar para auth
- Minimal boilerplate
- Compatible con React Compiler

**Alternativas rechazadas**:
- Redux: demasiado boilerplate
- Context API: re-renders innecesarios
- Jotai: similar a Zustand, menos popular

---

## ADR-003: React Query para Data Fetching

**Decisión**: @tanstack/react-query en lugar de SWR o Axios

**Razón**:
- Caching automático e inteligente
- Refetch on focus
- Optimistic updates
- Background refetch

**Configuración**:
- `staleTime: 30s` default
- Refetch on window focus
- 1 retry en fallos

---

## ADR-004: Formularios con React Hook Form + Zod

**Decisión**: RHF + Zod en lugar de Formik o Vee Validate

**Razón**:
- Performance: uncontrolled components
- Zod: type-safe validation
- Minimal re-renders
- Excelente DX

---

## ADR-005: JWT con Refresh Token

**Decisión**: Bearer token + refresh token automático

**Razón**:
- Seguridad: tokens corta vida
- Auto-refresh en 401
- Mantiene sesión transparente
- Logout explícito

**Flujo**:
1. Login → get access_token + refresh_token
2. Cada request: Bearer token en header
3. Si 401 → retry con refresh_token
4. Refresh éxito → retry request original
5. Refresh falla → logout

---

## ADR-006: TailwindCSS v4

**Decisión**: Tailwind CSS 4 en lugar de CSS Modules o Styled Components

**Razón**:
- Utility-first: desarrollo rápido
- Build-time: no runtime overhead
- Temas y variables CSS
- Ampliamente adoptado

---

## ADR-007: Componentes No Compartidos entre Web y Mobile

**Decisión**: Componentes web y mobile separados

**Razón**:
- Paradigmas diferentes (web vs mobile)
- React vs React Native: APIs incompatibles
- UX/UX distintos por plataforma
- Comparten: tipos, servicios, hooks

**Compartido**:
- `@autoparts/shared` → types, endpoints
- `services/` → pueden reutilizarse
- `hooks/` → lógica de negocio

---

## ADR-008: Role-Based Access Control (RBAC)

**Decisión**: Guards en componentes + middleware

**Razón**:
- Seguridad en frontend (UX)
- Protección adicional backend (essencial)
- RoleGuard component reutilizable
- Middleware para rutas batch

**Roles**:
- BUYER: comprar, solicitar piezas
- SELLER: publicar, cotizar
- ADMIN: gestión general

---

## ADR-009: API Client Centralizado

**Decisión**: `lib/api.ts` con `apiFetch()` centralizado

**Razón**:
- Refresh token automático
- Headers consistentes
- Error handling centralizado
- Fácil de mockar en tests

---

## ADR-010: Socket.io Configurado, WebSocket Pendiente

**Decisión**: Socket.io en package.json, listeners en Phase 2

**Razón**:
- MVP: REST + polling suficiente
- Phase 2: real-time chat
- Socket.io: fallback HTTP si no WS
- Reducir complejidad MVP

---

## Cambios Futuros

1. **Migraciones Next.js 17+**: Verificar API changes
2. **React 20**: Cuando salga estable
3. **Monorepo → Turborepo**: Si crece significativamente
4. **TypeScript 6+**: Adoptar nuevas features
5. **Tailwind 5+**: Upgrades CSS nativas

