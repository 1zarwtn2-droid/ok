export type ServiceCategory = 'cleaning' | 'restoration' | 'repair' | 'protection' | 'custom';

export type ProductType = 'treatment' | 'care_product';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  focusType?: 'repair' | 'cleaning';
  price: number;
  durationHours: number;
  description: string;
  benefits: string[];
  recommendedFor: string[];
  imageUrl: string;
  warranty: string;
  badge?: string;
  intensityLevel?: 'Light' | 'Medium' | 'Deep' | 'Master Restorer';
}

export interface CareProductItem {
  id: string;
  name: string;
  category: 'repair' | 'cleaning' | 'cleaner' | 'brush' | 'spray' | 'accessories';
  focusType?: 'repair' | 'cleaning';
  price: number;
  stock: number;
  description: string;
  volumeOrSpec: string;
  imageUrl: string;
  rating: number;
  salesCount: number;
}

export type OrderStatus = 
  | 'PENDING_PAYMENT'
  | 'BOOKING_CONFIRMED'
  | 'SHOES_RECEIVED'
  | 'IN_TREATMENT'
  | 'DRYING_DETAILING'
  | 'READY_PICKUP_DELIVERY'
  | 'COMPLETED'
  | 'CANCELLED';

export interface ShoeDetails {
  brand: string;
  model: string;
  color: string;
  material: 'Canvas' | 'Leather' | 'Suede' | 'Nubuck' | 'Mesh/Knit' | 'Mixed';
  conditionNote: string;
  photoBeforeUrl?: string;
  photoAfterUrl?: string;
  treatmentName?: string;
  treatmentPrice?: number;
}

export interface CustomerDetails {
  name: string;
  whatsapp: string;
  email: string;
  address?: string;
  notes?: string;
}

export type DeliveryMethod = 'drop_off' | 'pickup_delivery';

export type PaymentMethodType = 'qris' | 'va_bca' | 'va_mandiri' | 'va_bri' | 'gopay' | 'shopeepay' | 'cash_on_store';

export interface TimelineLog {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  updatedBy: string;
}

export interface OrderItem {
  id: string;
  orderNumber: string; // e.g., SC-2026-8812
  createdAt: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  addOns: { id: string; name: string; price: number }[];
  purchasedProducts: { id: string; name: string; price: number; quantity: number }[];
  additionalShoes?: ShoeDetails[];
  voucherCode?: string;
  discountAmount?: number;
  totalPrice: number;
  shoe: ShoeDetails;
  customer: CustomerDetails;
  deliveryMethod: DeliveryMethod;
  pickupAddress?: string;
  scheduledDate: string;
  scheduledTimeSlot: string; // e.g. "09:00 - 12:00 WIB"
  status: OrderStatus;
  paymentStatus: 'UNPAID' | 'PAID' | 'REFUNDED';
  paymentMethod?: PaymentMethodType;
  paymentTime?: string;
  technicianName: string;
  estimatedCompletion: string;
  courierTracking?: {
    courierName: string;
    driverName: string;
    trackingCode: string;
    status: string;
  };
  timeline: TimelineLog[];
  waNotificationHistory: {
    timestamp: string;
    stage: string;
    recipient: string;
    messageSnippet: string;
  }[];
}

export interface ReviewItem {
  id: string;
  orderNumber: string;
  customerName: string;
  rating: number; // 1 to 5
  serviceName: string;
  shoeModel: string;
  comment: string;
  date: string;
  beforePhotoUrl?: string;
  afterPhotoUrl?: string;
  replyFromAdmin?: string;
}

export interface QueueSlot {
  time: string;
  availableCount: number;
  maxCount: number;
}

export interface ShoeDiagnosisQuestion {
  id: string;
  question: string;
  options: {
    label: string;
    serviceId: string;
    recommendedAddons: string[];
    description: string;
  }[];
}
