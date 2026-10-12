# Inventario de endpoints

## Alcance

Este documento lista los endpoints que el frontend utiliza, define en `packages/shared/src/endpoints.ts` o contempla como pendientes para completar el marketplace.

El frontend no se conecta directamente a una base de datos. Todas las operaciones pasan por la API REST del backend.

```text
Frontend Next.js / Expo
        ↓
apiFetch()
        ↓
API REST del backend
        ↓
Base de datos del backend
```

## URL base

La URL base se obtiene de las siguientes variables de entorno:

```text
NEXT_PUBLIC_API_URL
EXPO_PUBLIC_API_URL
```

Valor por defecto:

```text
http://localhost:3000
```

Referencia: `packages/shared/src/endpoints.ts`.

## Convenciones

Los endpoints que indican **autenticado** requieren:

```http
Authorization: Bearer <access_token>
```

Los endpoints que contienen parámetros utilizan esta sintaxis:

```text
{requestId}
{orderId}
{notificationId}
{roomId}
{productId}
{userId}
{itemId}
{paymentId}
```

---

# Endpoints conectados actualmente

## 1. Autenticación

### Registrar usuario

```http
POST /auth/register
```

Payload:

```json
{
  "email": "usuario@example.com",
  "password": "password",
  "firstName": "Juan",
  "lastName": "Pérez",
  "role": "BUYER",
  "companyName": "Empresa opcional"
}
```

Roles disponibles:

```text
BUYER
SELLER
```

Estado: conectado desde `authService`.

### Iniciar sesión

```http
POST /auth/login
```

Payload:

```json
{
  "email": "usuario@example.com",
  "password": "password"
}
```

Respuesta esperada:

```json
{
  "access_token": "jwt-token",
  "refresh_token": "refresh-token",
  "user": {
    "id": "user-id",
    "email": "usuario@example.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "role": "BUYER"
  }
}
```

Estado: conectado desde `authService`.

### Renovar token

```http
POST /auth/refresh
```

El path se configura con:

```text
NEXT_PUBLIC_AUTH_REFRESH_PATH
```

Payload:

```json
{
  "refresh_token": "refresh-token"
}
```

Este endpoint se ejecuta automáticamente después de una respuesta `401` en una petición autenticada.

Estado: configurable e implementado en `lib/api.ts`.

---

## 2. Solicitudes de autopartes

### Listar solicitudes del usuario

```http
GET /requests
```

Autenticado.

Se utiliza en:

- `/buyer/requests`.
- `/seller/requests`, temporalmente.

Estado: conectado.

### Consultar solicitudes públicas

```http
GET /requests/public
```

No requiere autenticación. Devuelve publicaciones abiertas ordenadas por fecha descendente.

### Consultar solicitudes por ciudad

```http
GET /requests/public?city={city}
```

Ejemplo:

```http
GET /requests/public?city=Monterrey
```

No requiere autenticación. El frontend conserva publicaciones demo como fallback mientras el endpoint backend no esté disponible.

### Crear solicitud

```http
POST /requests
```

Autenticado.

Payload esperado:

```json
{
  "title": "Bomba de agua",
  "description": "Necesito una bomba de agua para Toyota Corolla",
  "category": "Motor",
  "partNumber": "16100-39466",
  "vehicleInfo": {
    "make": "Toyota",
    "model": "Corolla",
    "year": 2018
  }
}
```

Estado: conectado desde el formulario `/buyer/requests`.

---

## 3. Ofertas y cotizaciones

### Crear oferta

```http
POST /offers
```

Autenticado.

Payload esperado:

```json
{
  "requestId": "request-id",
  "price": 249.99,
  "description": "Kit compatible con el vehículo solicitado",
  "condition": "NEW",
  "warranty": true,
  "warrantyDetails": "Garantía de 12 meses",
  "estimatedDeliveryDays": 3
}
```

Valores para `condition`:

```text
NEW
USED
REFURBISHED
```

Estado: conectado desde `/seller/quotes/new`.

### Listar ofertas de una solicitud

```http
GET /offers/request/{requestId}
```

Autenticado.

Estado: disponible en el servicio; falta la pantalla para comparar y aceptar ofertas.

---

## 4. Órdenes

### Listar órdenes

```http
GET /orders
```

Autenticado.

Se utiliza en:

- `/buyer/orders`.
- `/seller/sales`.

Estado: conectado.

### Actualizar estado de una orden

```http
PATCH /orders/{orderId}/status
```

Autenticado.

Payload:

```json
{
  "status": "SHIPPED"
}
```

Estados disponibles:

```text
PENDING
PAID
SHIPPED
DELIVERED
CANCELLED
```

Estado: disponible en el servicio; falta la interfaz de actualización.

---

## 5. Notificaciones

### Listar notificaciones

```http
GET /notifications
```

Autenticado.

Estado: disponible en el servicio; falta la interfaz visual.

### Marcar notificación como leída

```http
PATCH /notifications/{notificationId}/read
```

Autenticado.

Estado: disponible en el servicio; falta la interfaz visual.

---

## 6. Chat

### Obtener sala por solicitud

```http
GET /chat/rooms/{requestId}
```

Autenticado.

Estado: disponible en el servicio.

### Obtener mensajes de una sala

```http
GET /chat/rooms/{roomId}/messages
```

Autenticado.

Estado: disponible en el servicio.

### Namespace WebSocket

```text
/chat
```

El namespace está definido para Socket.IO, pero todavía no existe una interfaz completa de chat en tiempo real.

Pendiente:

- Conexión WebSocket.
- Envío de mensajes.
- Recepción de mensajes.
- Actualización en tiempo real.
- Indicadores de conexión.

---

# Endpoints pendientes o recomendados

Estos endpoints no están conectados actualmente en el frontend y deben confirmarse con el equipo backend antes de implementarlos.

## 7. Productos

El servicio actual de productos devuelve una lista vacía y no realiza peticiones reales.

Endpoints esperados:

```http
GET /products
GET /products?category=Motor
GET /products?query=frenos
GET /products/{productId}
POST /products
PATCH /products/{productId}
DELETE /products/{productId}
```

| Método | Endpoint | Uso | Rol esperado |
|---|---|---|---|
| `GET` | `/products` | Listar productos | Público |
| `GET` | `/products?category=Motor` | Filtrar por categoría | Público |
| `GET` | `/products?query=frenos` | Buscar productos | Público |
| `GET` | `/products/{productId}` | Ver detalle | Público |
| `POST` | `/products` | Crear producto | `SELLER` |
| `PATCH` | `/products/{productId}` | Editar producto | `SELLER` |
| `DELETE` | `/products/{productId}` | Eliminar producto | `SELLER` |

## 8. Usuarios y perfil

El servicio actual de usuarios todavía devuelve `null`.

Endpoints esperados:

```http
GET /me
PUT /me
GET /users/{userId}
PUT /users/{userId}
POST /users/{userId}/avatar
```

| Método | Endpoint | Uso |
|---|---|---|
| `GET` | `/me` | Obtener perfil actual |
| `PUT` | `/me` | Actualizar perfil propio |
| `GET` | `/users/{userId}` | Consultar perfil público |
| `PUT` | `/users/{userId}` | Actualizar usuario |
| `POST` | `/users/{userId}/avatar` | Subir avatar |

## 9. Carrito

Actualmente no existe un store ni un servicio de carrito.

Endpoints recomendados:

```http
GET /cart
POST /cart
POST /cart/items
PATCH /cart/items/{itemId}
DELETE /cart/items/{itemId}
DELETE /cart
```

| Método | Endpoint | Uso |
|---|---|---|
| `GET` | `/cart` | Obtener carrito actual |
| `POST` | `/cart` | Crear carrito |
| `POST` | `/cart/items` | Agregar producto |
| `PATCH` | `/cart/items/{itemId}` | Cambiar cantidad |
| `DELETE` | `/cart/items/{itemId}` | Eliminar producto |
| `DELETE` | `/cart` | Vaciar carrito |

## 10. Checkout y creación de orden

El frontend todavía no tiene un endpoint para convertir el carrito en una orden.

Endpoint recomendado:

```http
POST /cart/checkout
```

Payload sugerido:

```json
{
  "shippingAddress": {
    "street": "Calle Principal 123",
    "city": "Ciudad",
    "state": "Estado",
    "postalCode": "00000",
    "country": "México"
  },
  "paymentMethod": "CARD"
}
```

Endpoints complementarios sugeridos:

```http
GET /orders/{orderId}
POST /orders/{orderId}/cancel
POST /orders/{orderId}/confirm-delivery
```

## 11. Pagos

Actualmente no existe integración de pagos.

Endpoints recomendados:

```http
POST /payments/process
GET /payments/{paymentId}/status
POST /payments/{paymentId}/refund
```

| Método | Endpoint | Uso |
|---|---|---|
| `POST` | `/payments/process` | Procesar pago |
| `GET` | `/payments/{paymentId}/status` | Consultar estado del pago |
| `POST` | `/payments/{paymentId}/refund` | Solicitar reembolso |

## 12. Analítica del vendedor

Los valores actuales del dashboard son estáticos.

Endpoints recomendados:

```http
GET /seller/stats
GET /seller/reviews
GET /seller/analytics/sales
GET /seller/analytics/conversion
```

---

# Resumen general

## Endpoints REST conectados o definidos actualmente

| Método | Endpoint | Módulo | Estado |
|---|---|---|---|
| `POST` | `/auth/register` | Registro | Conectado |
| `POST` | `/auth/login` | Login | Conectado |
| `POST` | `/auth/refresh` | Refresh token | Configurable |
| `GET` | `/requests` | Listar solicitudes | Conectado |
| `POST` | `/requests` | Crear solicitud | Servicio disponible |
| `POST` | `/offers` | Crear oferta | Conectado |
| `GET` | `/offers/request/{requestId}` | Listar ofertas | Servicio disponible |
| `GET` | `/orders` | Listar órdenes | Conectado |
| `PATCH` | `/orders/{orderId}/status` | Cambiar estado | Servicio disponible |
| `GET` | `/notifications` | Listar notificaciones | Servicio disponible |
| `PATCH` | `/notifications/{notificationId}/read` | Marcar leída | Servicio disponible |
| `GET` | `/chat/rooms/{requestId}` | Obtener sala | Servicio disponible |
| `GET` | `/chat/rooms/{roomId}/messages` | Obtener mensajes | Servicio disponible |
| WebSocket | `/chat` | Chat en tiempo real | Pendiente |

## Endpoints aún pendientes de backend/frontend

```text
Products:
GET    /products
GET    /products?category={category}
GET    /products?query={query}
GET    /products/{productId}
POST   /products
PATCH  /products/{productId}
DELETE /products/{productId}

Users:
GET    /me
PUT    /me
GET    /users/{userId}
PUT    /users/{userId}
POST   /users/{userId}/avatar

Cart:
GET    /cart
POST   /cart
POST   /cart/items
PATCH  /cart/items/{itemId}
DELETE /cart/items/{itemId}
DELETE /cart
POST   /cart/checkout

Payments:
POST   /payments/process
GET    /payments/{paymentId}/status
POST   /payments/{paymentId}/refund

Seller analytics:
GET    /seller/stats
GET    /seller/reviews
GET    /seller/analytics/sales
GET    /seller/analytics/conversion
```

## Nota final

Las rutas como `/`, `/login`, `/search`, `/cart` y `/checkout` son rutas del frontend Next.js, no endpoints de la API backend.
