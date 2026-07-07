// src/types/firebase.ts
import { Timestamp } from "firebase/firestore";

// 공통 베이스
export interface BaseDoc {
  id: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

// 1. 공간 (연습실/아트홀)
export type SpaceType = "practice" | "art_hall";
export type SpaceStatus = "active" | "maintenance" | "closed";

export interface Space extends BaseDoc {
  name: string;           // "연습실 A", "메인 아트홀"
  type: SpaceType;
  status: SpaceStatus;
  description: string;
  capacity: number;       // 수용 인원
  pricePerHour: number;   // 기본 시간당 요금 (원)
  pricePerDay?: number;   // 일일 요금 (선택)
  images: string[];       // Storage URL 배열
  equipments: string[];   // ["그랜드피아노(Yamaha C3)", "조율완료", "냉난방", "WiFi"]
  features: string[];     // ["방음등급 1급", "녹음가능", "주차가능"]
  // 요금제 예외 설정 (요일/시간대별 할증/할인) - 추후 확장용
  pricingRules?: PricingRule[];
}

export interface PricingRule {
  id: string;
  name: string;           // "심야 할인", "주말 할증"
  daysOfWeek: number[];   // 0(일)~6(토)
  startTime: string;      // "22:00"
  endTime: string;        // "06:00"
  discountPercent: number; // -20 (할인), +30 (할증)
  isActive: boolean;
}

// 2. 예약
export type ReservationStatus = "pending" | "confirmed" | "cancelled" | "completed" | "no_show";
export type PaymentStatus = "unpaid" | "paid" | "partial_refunded" | "full_refunded" | "failed";

export interface Reservation extends BaseDoc {
  userId: string;         // 예약자 UID
  spaceId: string;        // 공간 ID
  spaceName: string;      // 조회용 복사 (성능)
  startTime: Timestamp | Date;
  endTime: Timestamp | Date;
  durationMinutes: number;
  purpose: "practice" | "lesson" | "recording" | "performance" | "other";
  status: ReservationStatus;
  paymentStatus: PaymentStatus;
  totalPrice: number;     // 최종 결제 금액
  priceBreakdown: {       // 상세 내역
    basePrice: number;
    discount: number;
    extraFees: number;    // 조율비, 장비대여 등
  };
  extras: {               // 추가 옵션
    tuning?: boolean;
    recordingEquip?: boolean;
    videoEquip?: boolean;
    pianoMove?: boolean;
  };
  // 정기 예약 시
  recurringId?: string;   // 부모 정기예약 ID
  isRecurring?: boolean;
  // 취소/환불
  cancelledAt?: Timestamp | Date;
  cancelReason?: string;
  refundAmount?: number;
}

// 3. 유저 프로필 (Auth custom claims 연동)
export type UserRole = "user" | "teacher" | "admin" | "super_admin";

export interface UserProfile extends BaseDoc {
  uid: string;            // Auth UID
  email: string;
  displayName: string;
  phoneNumber?: string;
  role: UserRole;
  profileImage?: string;
  // 선생님 전용
  teacherInfo?: {
    bio: string;
    subjects: string[];   // ["피아노", "작곡", "입시"]
    approved: boolean;    // 관리자 승인 여부
  };
  // 통계
  stats: {
    totalReservations: number;
    totalSpent: number;
    noShowCount: number;
  };
  // 알림 설정
  notificationSettings: {
    push: boolean;
    kakaoTalk: boolean;
    sms: boolean;
    reminder1h: boolean;
    reminder1d: boolean;
  };
}

// 4. 결제 내역
export interface Payment extends BaseDoc {
  reservationId: string;
  userId: string;
  amount: number;
  method: "card" | "vbank" | "kpay" | "naverpay" | "cash" | "point";
  pgProvider: "tosspayments" | "nice" | "kg" | "manual";
  pgTransactionId?: string; // PG사 거래번호
  status: "ready" | "success" | "failed" | "cancelled" | "partial_cancelled";
  receiptUrl?: string;      // 현금영수증/세금계산서 URL
  cancelledAt?: Timestamp | Date;
  cancelReason?: string;
}

// 5. 쿠폰/포인트
export interface Coupon extends BaseDoc {
  code: string;             // "WELCOME10", "KLANG2024"
  name: string;             // "신규가입 10% 할인"
  type: "percent" | "fixed" | "free_time";
  value: number;            // 10 (%), 5000 (원), 60 (분)
  minPurchase?: number;     // 최소 결제 금액
  maxDiscount?: number;     // 최대 할인 금액
  validFrom: Timestamp | Date;
  validUntil: Timestamp | Date;
  usageLimit: number;       // 총 발급 가능 수
  usedCount: number;        // 현재 사용 수
  targetRoles: UserRole[];  // ["user", "teacher"]
  isActive: boolean;
}

export interface UserCoupon extends BaseDoc {
  userId: string;
  couponId: string;
  couponCode: string;
  status: "available" | "used" | "expired";
  usedAt?: Timestamp | Date;
  reservationId?: string;   // 사용된 예약 ID
}
