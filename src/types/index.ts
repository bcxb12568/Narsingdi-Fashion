export type ProductCategory = 
  | 'jamdani-saree'
  | 'three-piece'
  | 'panjabi'
  | 'wholesale';

export interface Product {
  id: string;
  titleBn: string;
  titleEn: string;
  category: ProductCategory;
  categoryNameBn: string;
  retailPrice: number;
  wholesalePrice: number;
  minWholesaleQty: number;
  stock: number;
  fabric: string;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isPinned?: boolean;
  pinnedAt?: number;
  sizes?: string[];
  colors?: string[];
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  isWholesale: boolean;
  selectedSize?: string;
  selectedColor?: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Canceled';

export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'card';

export interface CourierInfo {
  provider: 'Steadfast' | 'Pathao' | 'RedX' | 'Paperfly';
  trackingCode: string;
  consignmentId?: string;
  status?: string;
  bookedAt?: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address: string;
  district: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending';
  trxId?: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  grandTotal: number;
  status: OrderStatus;
  courier?: CourierInfo;
  notes?: string;
  rating?: number;
  ratingComment?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  district: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  registeredDate: string;
  lastOrderDate: string;
}

export interface GoogleReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  isGoogleVerified: boolean;
  isApproved: boolean;
  avatarText?: string;
  productTitle?: string;
  productId?: string;
  orderId?: string;
  reply?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  heroHeading: string;
  heroSubtext: string;
  storePhone: string;
  storeEmail: string;
  storeAddress: string;
  deliveryInsideNarsingdi: number;
  deliveryOutsideNarsingdi: number;
  freeDeliveryOver: number;
  bkashNumber: string;
  nagadNumber: string;
  allowCod: boolean;
  bannerNotice: string;
  adminPassword?: string;
  logoUrl?: string;
  autoRemoveDeliveredOrders?: boolean;
}
