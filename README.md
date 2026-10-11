# Autoparts Marketplace Frontend - Arquitectura Completa

> Monorepo con Stack Next.js + React Native Expo + Tipos Compartidos, conectado a endpoints reales del backend conforme a TESTING_GUIDE.md

## 📋 Contenido

1. [Estructura del Proyecto](#estructura)
2. [Stack Tecnológico](#stack)
3. [Inicio Rápido](#inicio)
4. [Arquitectura](#arquitectura)
5. [Pantallas Implementadas](#pantallas)
6. [Servicios API](#servicios)
7. [Seguridad y Autenticación](#seguridad)
8. [Endpoints Documentados vs. Pendientes](#endpoints)
9. [Escalabilidad](#escalabilidad)

---

## <a id="estructura"></a>📁 Estructura del Proyecto

```
autopart-mackertplace-front/
├── apps/
│   ├── web/                    # Next.js 16 + TypeScript + TailwindCSS
│   │   ├── app/                # App Router (buyer, seller, auth)
│   │   │   ├── (public)/       # login, register, search, home
│   │   │   ├── buyer/          # órdenes, solicitudes (role guard)
│   │   │   ├── seller/         # dashboard, inventario, cotizaciones
│   │   │   └── layout.tsx      # Root layout + Providers
│   │   ├── components/
│   │   │   ├── auth/           # RoleGuard para rutas protegidas
│   │   │   ├── layout/         # Navbar, Sidebar
│   │   │   ├── marketplace/    # ProductCard, RequestCard, Filters
│   │   │   ├── orders/         # OrdersTable
│   │   │   └── ui/             # Loader, Modal, Toast, base components
│   │   ├── services/           # Cliente HTTP por módulo
│   │   │   ├── auth.service.ts       # Login, Register
│   │   │   ├── requests.service.ts   # Mis solicitudes, crear
│   │   │   ├── bids.service.ts       # Ofertas/cotizaciones
│   │   │   ├── orders.service.ts     # Órdenes, estado
│   │   │   ├── notifications.service.ts
│   │   │   ├── chat.service.ts
│   │   │   ├── products.service.ts   # [PENDIENTE BACKEND]
│   │   │   └── users.service.ts      # [PENDIENTE BACKEND]
│   │   ├── hooks/              # React hooks personalizados
│   │   │   ├── useAuth.ts
│   │   │   ├── useProducts.ts
│   │   │   ├── useOrders.ts
│   │   │   ├── useNotifications.ts
│   │   │   └── useMarketplaceSearch.ts
│   │   ├── store/              # Estado global (Zustand)
│   │   │   └── auth-store.ts   # User, accessToken, refreshToken
│   │   ├── lib/                # Utilities
│   │   │   ├── api.ts          # Cliente HTTP con refresh token
│   │   │   ├── query-client.ts # React Query config
│   │   │   └── utils.ts        # Helpers (cn, etc)
│   │   ├── middleware.ts       # Middleware Next.js para rutas protegidas
│   │   └── providers.tsx       # QueryClientProvider, ToastProvider
│   │
│   └── mobile/                 # Expo + React Native (scaffold base)
│       ├── App.tsx             # Entry point
│       ├── app.json            # Configuración Expo
│       ├── babel.config.js
│       └── tsconfig.json
│
├── packages/
│   └── shared/                 # Tipos y endpoints compartidos
│       ├── src/
│       │   ├── types.ts        # Domain types (AuthUser, PartRequest, Offer, etc)
│       │   ├── endpoints.ts    # API routes config
│       │   └── index.ts        # Exports
│       ├── package.json
│       └── tsconfig.json
│
├── .github/
│   └── copilot-instructions.md # Checklist de desarrollo
│
└── package.json                # Root: workspaces, scripts
```

---

## <a id="stack"></a>⚙️ Stack Tecnológico

### Web Frontend
- **Framework**: Next.js 16.2 (App Router)
- **Lenguaje**: TypeScript 5
- **Estilos**: TailwindCSS 4
- **Estado Global**: Zustand 5
- **Data Fetching**: @tanstack/react-query 5
- **Formularios**: React Hook Form + Zod (validación)
- **Realtime**: Socket.io-client (chat)
- **Utilidades**: clsx

### Mobile (Expo Base)
- **Framework**: Expo 53 + React Native
- **Lenguaje**: TypeScript
- **Código Compartido**: `packages/shared`

### Paquete Compartido
- Tipos de dominio (AuthUser, PartRequest, Offer, Order, etc)
- Endpoints y rutas de API
- Exportados a web y mobile

### Autenticación
- JWT (Bearer tokens)
- Refresh token en localStorage
- Guards de rutas por role (BUYER/SELLER/ADMIN)
- Zustand para persistencia de sesión

---

## <a id="inicio"></a>🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- npm 9+ (o pnpm)
- Backend corriendo en http://localhost:3000

### Instalación

```bash
# Clonar/descargar proyecto
cd autopart-mackertplace-front

# Instalar dependencias (root + workspaces)
npm install

# NOTA: En Windows, si falla con @swc/helpers, ejecutar:
# npm install @swc/helpers --save-dev
```

### Ejecutar

```bash
# Web (development)
npm run dev:web
# Abre en http://localhost:3000

# Web (production build)
npm run build:web

# Lint
npm run lint:web

# Mobile
npm run dev:mobile
```

---

## <a id="arquitectura"></a>🏛️ Arquitectura

### Capas

```
┌─────────────────────────────────────┐
│   Pantallas (pages)                 │ App Router + Role Guards
├─────────────────────────────────────┤
│   Componentes UI Reutilizables      │ ProductCard, Modal, Navbar, etc
├─────────────────────────────────────┤
│   Custom Hooks (useAuth, useOrders) │ Encapsulan React Query + estado
├─────────────────────────────────────┤
│   Servicios API (services/*.ts)     │ Abstracto HTTP + endpoints
├─────────────────────────────────────┤
│   Cliente HTTP (lib/api.ts)         │ Fetch + refresh token automático
├─────────────────────────────────────┤
│   Zustand Store (auth-store)        │ Persiste user + tokens
├─────────────────────────────────────┤
│   Tipos Compartidos (@autoparts)    │ Contracts con backend
└─────────────────────────────────────┘
```

### Flujo de Datos

1. **Componente** → llama `useAuth()` / `useOrders()` / etc
2. **Hook** → ejecuta `mutation/query` con React Query
3. **Servicio** → llama `authService.login()` / `ordersService.list()`
4. **Cliente HTTP** → `apiFetch(endpoint, {method, auth, body})`
5. **Refresh Token** → si 401, intenta refrescar automáticamente
6. **Response** → vuelve a Hook → UI actualiza

---

## <a id="pantallas"></a>📱 Pantallas Implementadas

### Públicas (sin autenticación)
- **`/`** - Home marketplace con destacados
- **`/login`** - Iniciar sesión
- **`/register`** - Crear cuenta (buyer/seller)
- **`/search`** - Buscador con filtros

### Buyer (rol BUYER)
- **`/buyer/orders`** - Mis pedidos (tabla con estado)
- **`/buyer/requests`** - Mis solicitudes de piezas
- **`/profile`** - Perfil usuario (email, rol)

### Seller (rol SELLER)
- **`/seller/dashboard`** - Stats: solicitudes activas, ofertas, ventas
- **`/seller/products/new`** - Publicar producto [PENDIENTE BACKEND]
- **`/seller/inventory`** - Gestionar stock [PENDIENTE BACKEND]
- **`/seller/requests`** - Solicitudes del marketplace
- **`/seller/quotes/new`** - Enviar cotización (form completo)
- **`/seller/sales`** - Historial de ventas
- **`/seller/stats`** - Estadísticas de conversión [PENDIENTE BACKEND]

### Pendientes Frontend
- **`/products/[id]`** - Detalle producto
- **`/cart`** - Carrito
- **`/checkout`** - Pago

---

## <a id="servicios"></a>🔗 Servicios API

### Conectados a TESTING_GUIDE.md ✅

#### `authService`
```typescript
register({ email, password, firstName, lastName, role, companyName })
  → POST /auth/register
login({ email, password })
  → POST /auth/login
```

#### `requestsService`
```typescript
listMine() → GET /requests
create({title, description, category, partNumber, vehicleInfo})
  → POST /requests
```

#### `bidsService` (Offers)
```typescript
create({requestId, price, description, condition, warranty, ...})
  → POST /offers
byRequest(requestId) → GET /offers/request/{id}
```

#### `ordersService`
```typescript
listMine() → GET /orders
updateStatus(orderId, status: PENDING|PAID|SHIPPED|DELIVERED|CANCELLED)
  → PATCH /orders/{id}/status
```

#### `notificationsService`
```typescript
list() → GET /notifications
markAsRead(id) → PATCH /notifications/{id}/read
```

#### `chatService`
```typescript
roomByRequest(requestId) → GET /chat/rooms/{id}
messages(roomId) → GET /chat/rooms/{roomId}/messages
```

### Pendientes Backend ⏳

#### `productsService` 
```
Endpoints no documentados en TESTING_GUIDE:
- Listar productos
- Detalle producto
- Buscar/filtrar
```

#### `usersService`
```
Endpoints no documentados:
- GET /me (perfil actual)
- PUT /users/{id} (actualizar perfil)
- GET /users/{id} (perfil público)
```

### Endpoints Recomendados Faltantes

**MVP Missing Endpoints (HIGH PRIORITY)**

```
Products:
GET /products → Listar marketplace
GET /products?category=Motor → Filtrar
GET /products/{id} → Detalle
POST /products → Crear (seller)
PATCH /products/{id} → Editar (seller)
DELETE /products/{id} → Eliminar (seller)

Users:
GET /me → Perfil actual (con stats si es seller)
PUT /me → Actualizar datos
POST /users/{id}/avatar → Upload avatar

Cart (si quieres checkout):
POST /cart → Crear carrito
POST /cart/items → Agregar item
DELETE /cart/items/{itemId}
POST /cart/checkout → Crear orden

Payments:
POST /payments/process → Procesar pago
GET /payments/{id}/status → Estado pago

Analytics (seller):
GET /seller/stats → Conversión, ingresos, rating
GET /seller/reviews → Reseñas recibidas
```

---

## <a id="seguridad"></a>🔐 Seguridad y Autenticación

### JWT Flow
1. **Login** → backend devuelve `{access_token, refresh_token, user}`
2. **Zustand Store** → guarda tokens y user
3. **Cada request** → header `Authorization: Bearer {accessToken}`
4. **401 Response** → auto-intenta refresh con `refreshToken`
5. **Refresh exitoso** → actualiza tokens y reintenta request
6. **Refresh fallido** → logout y redirige a `/login`

### Role Guards
- `RoleGuard` wrappea rutas buyer/seller
- Verifica `useAuthStore` en runtime
- Redirige a `/login` si no autenticado
- Redirige a `/` si rol no permitido

### Almacenamiento
- Tokens en `Zustand` (memory + en-flight refresh)
- Considerar localStorage si needed: `useEffect(() => localStorage.setItem(...)`

---

## <a id="endpoints"></a>📊 Resumen Endpoints

| Módulo | Documentado | Conectado | Estado |
|--------|-------------|-----------|--------|
| **Auth** | TESTING_GUIDE | ✅ | Listo |
| **Requests** | TESTING_GUIDE | ✅ | Listo |
| **Offers/Bids** | TESTING_GUIDE | ✅ | Listo |
| **Orders** | TESTING_GUIDE | ✅ | Listo |
| **Notifications** | TESTING_GUIDE | ✅ | Listo |
| **Chat** (REST) | TESTING_GUIDE | ✅ | Listo |
| **Chat** (WS) | Documentado | ⏳ | Pendiente implementar socket.io |
| **Products** | ❌ NO | ❌ | PENDIENTE BACKEND |
| **Users** | ❌ NO | ❌ | PENDIENTE BACKEND |
| **Cart** | ❌ NO | ❌ | PENDIENTE BACKEND |
| **Payments** | ❌ NO | ❌ | PENDIENTE BACKEND |

---

## <a id="escalabilidad"></a>📈 Recomendaciones Escalabilidad

### Phase 2: Mejoras Inmediatas
1. **WebSocket Chat Real-time**
   - Implementar socket.io en `hooks/useChat.ts`
   - UI con lista de mensajes y textarea
   - Típing indicators

2. **Carrito Persistente**
   - Zustand store para items
   - Sincronizar con backend si existe
   - Validar stock antes de checkout

3. **Búsqueda Avanzada**
   - Debounce en buscador
   - Filtros multidimensionales (marca, modelo, año, precio)
   - Sugerencias de autocomplete

4. **Upload de Imágenes**
   - Cloudinary o S3
   - Drag-and-drop en forms
   - Preview antes de enviar

### Phase 3: Optimización
1. **Lazy Loading Pantallas**
   - `next/dynamic` para componentes grandes
   - Code splitting automático

2. **Caché Inteligente**
   - `staleTime` diferente por dato (requests: 5min, products: 1h)
   - Refetch en focus de window
   - Mutations con optimistic updates

3. **Offline Support**
   - Service Worker
   - IndexedDB para cache local
   - Sync cuando vuelve conexión

4. **Analytics**
   - Google Analytics o Mixpanel
   - Track conversiones, tiempo en página
   - A/B testing de UI

### Phase 4: Enterprise
1. **Multi-idioma** (i18n)
   - next-i18n-router
   - Español/Inglés/Portugués

2. **PWA** 
   - Web app installable
   - Push notifications

3. **Admin Dashboard**
   - Usuarios, transacciones, disputes
   - Reportes y gráficos

4. **Monitoreo**
   - Sentry para errors
   - LogRocket para sesiones
   - DataDog para performance

---

## 🛠️ Desarrollo

### Agregar Nueva Página
1. Crear archivo en `app/(ruta)/page.tsx`
2. Si requiere auth: wrappear con `<RoleGuard allow={["BUYER"]}>`
3. Si requiere datos: crear hook en `hooks/` usando `useQuery`

### Agregar Nuevo Servicio
1. Crear `services/nuevo.service.ts`
2. Exportar funciones que llamen `apiFetch(endpoint, {method, auth, body})`
3. Crear hook en `hooks/useNuevo.ts` con `useMutation` o `useQuery`
4. Usar hook en componentes

### Agregar Componente Reutilizable
1. Crear en `components/ui/` o `components/marketplace/`
2. Exportar desde index si necesario
3. Documentar props en comentario JSDoc

### Testing
```bash
# Lint
npm run lint:web

# Build
npm run build:web

# Type check
npm run build:web  # Next.js valida tipos automáticamente
```

---

## 📝 Notas Importante

- ✅ **Arquitectura completada**: Todas las pantallas, hooks, servicios diseñados
- ✅ **Tipos compartidos**: `packages/shared` exports a web y mobile
- ✅ **Seguridad**: Role guards, refresh token, JWT ready
- ✅ **Lint**: Proyecto pasa ESLint (3 warnings menores ignorables)
- ⏳ **Chat en vivo**: Socket.io configurado en TESTING_GUIDE, necesita implementar listeners
- ⏳ **Mobile**: Base scaffold Expo lista, comparte servicios con web
- ❌ **Backend**: Endpoints productos, usuarios, carrito, pagos NO están en TESTING_GUIDE

---

## 📞 Soporte

- **Backend**: http://localhost:3000
- **TESTING_GUIDE**: Referencia de endpoints disponibles
- **Tipos**: Ver `packages/shared/src/types.ts`
- **Endpoints**: Ver `packages/shared/src/endpoints.ts`

---

**Generado**: 21/04/2026
**Stack**: Next.js 16 + TypeScript + Zustand + React Query + TailwindCSS
**Conectado a**: TESTING_GUIDE.md (Autoparts Backend)
