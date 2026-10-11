export type UserRole = "BUYER" | "SELLER" | "ADMIN";

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  companyName?: string;
}

export interface VehicleInfo {
  make: string;
  model: string;
  year: number;
}

export interface PartRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  partNumber?: string;
  vehicleInfo: VehicleInfo;
  createdAt?: string;
}

export interface Offer {
  id: string;
  requestId: string;
  price: number;
  description: string;
  condition: "NEW" | "USED" | "REFURBISHED";
  warranty: boolean;
  warrantyDetails?: string;
  estimatedDeliveryDays: number;
  createdAt?: string;
}

export interface Notification {
  id: string;
  title?: string;
  message: string;
  read: boolean;
  createdAt?: string;
}

export interface Order {
  id: string;
  status: OrderStatus;
  total?: number;
  createdAt?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  condition?: string;
  stock?: number;
  imageUrl?: string;
  category?: string;
}

export interface ChatRoom {
  id: string;
  requestId: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId?: string;
  content: string;
  createdAt?: string;
}
