
export enum ViewType {
  HOME = 'HOME',
  SCHEDULE = 'SCHEDULE',
  BOOKINGS = 'BOOKINGS',
  EXPENSE = 'EXPENSE',
  PLANNING = 'PLANNING',
  MEMBERS = 'MEMBERS'
}

export interface ThemeConfig {
  name: string;
  main: string;
  text: string;
  light: string;
  bg: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  location: string;
  type: 'sight' | 'food' | 'transport' | 'hotel' | 'shopping';
  region: 'Japan' | 'Korea';
  note?: string;
  mapUrl?: string;
  naverMapUrl?: string;
  transportDetail?: TransportDetail;
}

export interface TransportDetail {
  mode: string;
  line: string;
  stationStart: string;
  stationEnd: string;
  platform?: string;
  exit?: string;
  duration: string;
  stops?: number;
}

export interface Booking {
  id: string;
  category: 'flight' | 'accommodation' | 'ticket' | 'restaurant';
  title: string;
  detail: string;
  time: string;
  image?: string;
  voucherUrl?: string;
  mapUrl?: string;
  checkIn?: string;
  checkOut?: string;
  gate?: string;
  seat?: string;
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  location: string;
  image: string;
  price?: string;
  bought: boolean;
  memberId: string;
}

export interface AIGuide {
  story: string;
  mustEat: string[];
  mustBuy: string[];
  transport: {
    mode: string;
    line: string;
    stationStart: string;
    stationEnd: string;
    duration: string;
    details: string; // 從上一個地點過來的具體指引
  }[];
}

export interface AIShortcutResponse {
  title: string;
  content: string[];
  tips: string;
}

export interface ExpenseItem {
  id: string;
  category: string;
  title: string;
  amount: number;
}
