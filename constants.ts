
// Fix: Removed LuggageItem as it is not exported from types.ts and not used in this file
import { ThemeConfig, ScheduleItem, Booking, Member, ShoppingItem, ExpenseItem } from './types';

export const THEMES: ThemeConfig[] = [
  { name: '淡灰', main: '#CDCDC6', text: '#5D5D5D', light: '#E8E8E2', bg: '#F2F2ED' },
  { name: '太空漫步', main: '#D2D8D6', text: '#545D5B', light: '#E9EEEC', bg: '#F4F7F6' },
  { name: '可可蛋奶', main: '#F7F3E7', text: '#6D644E', light: '#FFFBF0', bg: '#FFFEF9' },
  { name: '杏子灰', main: '#EDF0E4', text: '#5E6351', light: '#F6F9EF', bg: '#FAFCF7' },
  { name: '大馬士革', main: '#D6AD89', text: '#5C4431', light: '#F2E2D2', bg: '#FAF5F0' },
  { name: '藍亞麻', main: '#CAD6E8', text: '#455061', light: '#E3EAF5', bg: '#F1F5FB' },
  { name: '倫敦霧', main: '#A9B4AB', text: '#3E4740', light: '#D6DED8', bg: '#E9EFEC' },
  { name: '灰藍', main: '#76899A', text: '#FFFFFF', light: '#BDC7D1', bg: '#F0F3F5' }
];

export const INITIAL_MEMBERS: Member[] = [
  { id: 'm1', name: '大雄', avatar: 'https://i.pravatar.cc/150?u=m1' },
  { id: 'm2', name: '靜香', avatar: 'https://i.pravatar.cc/150?u=m2' },
  { id: 'm3', name: '胖虎', avatar: 'https://i.pravatar.cc/150?u=m3' }
];

export const INITIAL_BOOKINGS: Booking[] = [
  { 
    id: 'b1', 
    category: 'flight', 
    title: 'JL802 日本航空', 
    detail: 'TPE 桃園 -> NRT 成田', 
    time: '10:00',
    gate: 'D6',
    seat: '22A'
  },
  { 
    id: 'b2', 
    category: 'accommodation', 
    title: '新宿王子大飯店', 
    detail: '新宿區歌舞伎町', 
    time: '15:00',
    checkIn: '2024-05-20 15:00',
    checkOut: '2024-05-25 11:00',
    mapUrl: 'https://maps.google.com',
    voucherUrl: '#'
  },
  { 
    id: 'b3', 
    category: 'restaurant', 
    title: '敘敘苑 燒肉', 
    detail: '晴空塔店 30F', 
    time: '18:30',
    voucherUrl: '#',
    mapUrl: 'https://maps.google.com'
  }
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  { 
    id: 's1', time: '10:00', title: '成田機場抵達', location: 'NRT Airport', type: 'transport', region: 'Japan' 
  },
  { 
    id: 's2', time: '13:30', title: '銀座和牛', location: 'Ginza Tokyo', type: 'food', region: 'Japan',
    transportDetail: { mode: '地鐵', line: '京成成田 Skyaccess', stationStart: '機場第2航廈', stationEnd: '日本橋', duration: '65min', platform: '1號' }
  }
];

export const INITIAL_SHOPPING: ShoppingItem[] = [
  { id: 'sh1', name: 'Saje 精油', category: '保養/美妝', location: '專賣店', image: 'https://picsum.photos/seed/saje/300/400', memberId: 'm1', bought: false },
  { id: 'sh2', name: '楓葉餅乾', category: '美食/特產', location: '當地超市', image: 'https://picsum.photos/seed/cookie/300/400', memberId: 'm2', bought: true }
];

export const INITIAL_EXPENSES: ExpenseItem[] = [
  { id: 'e1', title: '一蘭拉麵', amount: 1200, category: 'Food' },
  { id: 'e2', title: 'JR Pass 儲值', amount: 5000, category: 'Transport' }
];
