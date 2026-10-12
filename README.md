# Autoparts Marketplace Frontend - Arquitectura Completa

> Monorepo con Stack Next.js + React Native Expo + Tipos Compartidos, conectado a endpoints reales del backend conforme a TESTING_GUIDE.md

## 📋 Contenido

1. [Estructura del Proyecto](#estructura)
2. [Stack Tecnológico](#stack)
3. [Inicio Rápido](#inicio)
4. [Arquitectura](#arquitectura)
5. [Pantallas Implementadas](#pantallas)
6. [Flujos Funcionales](#flujos)
7. [Inventario de Endpoints](./ENDPOINTS.md)
8. [Servicios API](#servicios)
9. [Seguridad y Autenticación](#seguridad)
10. [Endpoints Documentados vs. Pendientes](#endpoints)
11. [Escalabilidad](#escalabilidad)

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
- Refresh token administrado en memoria por Zustand
- Guards de rutas por rol (BUYER/SELLER/ADMIN)
- Zustand para el estado de sesión; la persistencia tras recargar aún no está implementada

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
# Abre en http://localhost:3001

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
│   Zustand Store (auth-store)        │ Gestiona user + tokens
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

## <a id="flujos"></a>🔄 Flujos Funcionales

Esta sección describe el comportamiento actual del frontend y separa los flujos implementados, parcialmente implementados y pendientes.

### 1. Entrada al marketplace

1. El usuario entra en `/`.
2. Se muestran la propuesta de valor y productos destacados.
3. Los destacados de la página principal son datos estáticos definidos en `app/page.tsx`.
4. La navegación permite acceder al buscador, solicitudes, panel de vendedor y perfil.

**Estado:** parcialmente implementado; el catálogo todavía no proviene del backend.

### 2. Registro

1. El usuario entra en `/register`.
2. Completa nombre, apellido, email y contraseña.
3. Selecciona el rol `BUYER` o `SELLER`.
4. Si selecciona vendedor, puede indicar el nombre de la empresa.
5. El formulario valida con Zod y ejecuta `POST /auth/register`.

**Pendientes:** redirección posterior, mensajes de éxito/error y creación automática de sesión.

### 3. Inicio de sesión y sesión

1. El usuario entra en `/login`.
2. Se validan email y contraseña.
3. Se ejecuta `POST /auth/login`.
4. El backend devuelve `access_token`, `refresh_token` opcional y `user`.
5. Zustand guarda la sesión y el usuario vuelve a `/`.
6. Las peticiones autenticadas envían `Authorization: Bearer <accessToken>`.
7. Ante un `401`, `apiFetch` intenta renovar el token; si falla, ejecuta logout.

**Estado:** implementado, pero la sesión se mantiene en memoria y se pierde al recargar la página. No hay persistencia real en localStorage/cookies.

### 4. Protección por roles

- `/buyer/*` permite `BUYER` y `ADMIN`.
- `/seller/*` permite `SELLER` y `ADMIN`.
- Un usuario sin sesión es redirigido a `/login`.
- Un usuario con rol no permitido es redirigido a `/`.

La protección actual se ejecuta en cliente mediante `RoleGuard`. El middleware de Next.js tiene el matcher configurado, pero actualmente no realiza validación de sesión.

### 5. Búsqueda y detalle de productos

1. El usuario entra en `/search`.
2. Se consulta `useProducts`.
3. Puede buscar por título o descripción y filtrar por categoría.
4. Los resultados se filtran localmente y se muestran con `ProductCard`.
5. La ruta `/products/[id]` está preparada para mostrar el detalle.

**Estado:** incompleto. `productsService.list()` devuelve `[]`, `getById()` devuelve `null` y las tarjetas no enlazan todavía al detalle.

### 6. Solicitudes del comprador

1. El comprador accede a `/buyer/requests`.
2. Se consulta `GET /requests` con autenticación.
3. Se muestran sus solicitudes mediante `RequestCard`.
4. El servicio también soporta `POST /requests`, pero no existe todavía una pantalla para crear la solicitud.

**Estado:** listado implementado; creación, edición, cancelación y gestión de ofertas pendientes.

### 7. Solicitudes disponibles para vendedores

1. El vendedor accede a `/seller/requests`.
2. Actualmente se reutiliza temporalmente `GET /requests`.
3. Las solicitudes se muestran mediante `RequestCard`.

**Advertencia:** no existe aún un endpoint específico de solicitudes públicas/disponibles para vendedores. Por ello, el resultado puede no representar correctamente el marketplace.

### 8. Cotizaciones y ofertas

1. El vendedor entra en `/seller/quotes/new`.
2. Introduce el ID de una solicitud, precio, descripción, condición y días estimados de entrega.
3. El frontend ejecuta `POST /offers`.
4. El servicio también soporta `GET /offers/request/{id}` para consultar ofertas por solicitud.

**Pendientes:** seleccionar solicitudes desde la interfaz, listar ofertas al comprador, comparar ofertas, aceptar una oferta y convertirla en orden.

### 9. Carrito, checkout y pago

El flujo previsto es:

```text
Detalle de producto
  → Agregar al carrito
  → Revisar carrito
  → Checkout
  → Procesar pago
  → Crear orden
  → Confirmar compra
```

Actualmente `/cart` y `/checkout` son placeholders. No existen store de carrito, endpoints de carrito, integración de pagos ni creación de órdenes desde checkout.

**Estado:** no implementado.

### 10. Pedidos y ventas

- `/buyer/orders` consulta `GET /orders` y muestra los pedidos del comprador.
- `/seller/sales` reutiliza el mismo servicio para mostrar ventas del vendedor.
- `ordersService` soporta `PATCH /orders/{id}/status` con estados `PENDING`, `PAID`, `SHIPPED`, `DELIVERED` y `CANCELLED`.

**Pendientes:** acciones para actualizar estados, historial de cambios, cancelación, confirmación de entrega y validación de filtros específicos por rol.

### 11. Perfil

1. `/profile` obtiene el usuario desde Zustand.
2. Si no hay sesión, solicita iniciar sesión.
3. Si hay sesión, muestra nombre, email y rol.

**Estado:** solo lectura local. `usersService.me()` aún devuelve `null`; no existe edición de perfil ni cambio de contraseña.

### 12. Notificaciones y chat

El proyecto ya define servicios y endpoints para:

- `GET /notifications`.
- `PATCH /notifications/{id}/read`.
- `GET /chat/rooms/{requestId}`.
- `GET /chat/rooms/{roomId}/messages`.

Sin embargo, todavía no hay pantallas para mostrar notificaciones, marcar mensajes como leídos, abrir conversaciones, enviar mensajes o gestionar comunicación en tiempo real con Socket.IO.

**Estado:** servicios preparados; interfaz pendiente.

### 13. Operación del vendedor

Las rutas disponibles son:

- `/seller/dashboard`: indicadores actualmente estáticos.
- `/seller/products/new`: placeholder para publicar productos.
- `/seller/inventory`: placeholder para inventario y stock.
- `/seller/stats`: placeholder para métricas.
- `/seller/requests`: listado temporal de solicitudes.
- `/seller/quotes/new`: creación básica de ofertas.
- `/seller/sales`: listado básico de órdenes.

**Estado:** dashboard y navegación visuales; publicación, inventario y estadísticas requieren endpoints y UI.

### 14. Aplicación móvil

`apps/mobile` es un scaffold de Expo. Actualmente muestra información introductoria para compradores y vendedores y configura React Query, pero no tiene navegación, autenticación ni flujos conectados al backend.

### Resumen del flujo B2C esperado

```text
Buscar producto
  → Ver detalle
  → Agregar al carrito
  → Checkout
  → Pago
  → Crear orden
  → Envío
  → Entrega
```

Este flujo requiere implementar productos, carrito, checkout, pagos y creación de órdenes.

### Resumen del flujo B2B por solicitudes

```text
Comprador crea solicitud
  → Vendedores consultan solicitudes disponibles
  → Vendedores envían ofertas
  → Comprador compara ofertas
  → Comprador acepta una oferta
  → Se crea una orden
  → Se actualiza el estado hasta la entrega
```

En el estado actual solo están disponibles el listado de solicitudes, la creación básica de ofertas y la consulta básica de órdenes.

### Matriz de estado funcional

| Flujo | Estado actual |
|---|---|
| Home y navegación | Parcial; destacados estáticos |
| Registro | Petición implementada; UX incompleta |
| Login | Implementado; sesión no persistida |
| Refresh token | Implementado |
| Guards por rol | Cliente implementado; middleware pendiente |
| Búsqueda de productos | UI implementada; servicio devuelve lista vacía |
| Detalle de producto | Placeholder |
| Solicitudes del comprador | Listado implementado; creación UI pendiente |
| Solicitudes del vendedor | Temporal; endpoint no específico |
| Cotizaciones | Creación básica implementada |
| Comparar/aceptar ofertas | Pendiente |
| Carrito | Pendiente |
| Checkout y pagos | Pendiente |
| Pedidos | Consulta implementada; acciones pendientes |
| Inventario/publicación | Pendiente |
| Perfil | Lectura local |
| Notificaciones | Servicio sin UI |
| Chat | REST preparado; UI y tiempo real pendientes |
| Mobile | Scaffold inicial |

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

- ✅ **Arquitectura base**: Capas de páginas, componentes, hooks, servicios y tipos compartidos
- ✅ **Tipos compartidos**: `packages/shared` exporta contratos para web y mobile
- ✅ **Autenticación base**: Login, JWT, refresh token y guards de rol implementados
- ⏳ **Persistencia de sesión**: La sesión actual se mantiene en memoria y se pierde al recargar
- ⏳ **Marketplace**: Productos, detalle, carrito, checkout y pagos aún requieren implementación
- ⏳ **Chat y notificaciones**: Servicios/endpoints preparados, interfaz pendiente
- ⏳ **Mobile**: Scaffold Expo inicial, todavía sin navegación ni flujos conectados
- ❌ **Backend faltante**: Endpoints de productos, usuarios, carrito y pagos no están definidos en `TESTING_GUIDE`

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
