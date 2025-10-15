// API 타입 정의
export interface Realm {
  id: number;
  name: {
    ko_KR: string;
    en_US: string;
  };
  connected_realm_id: number;
}

export interface SearchAuctionRequest {
  region: "KR";
  realmId: number;
  name?: string;
  classId?: number;
  subclassId?: number;
  minQuality?: number;
  maxQuality?: number;
  minItemLevel?: number;
  maxItemLevel?: number;
  expansionId?: number;
  page?: number;
  size?: number;
}

export interface SearchAuctionResponse {
  item_id: number;
  item_name: {
    ko_KR: string;
    en_US: string;
  };
  item_bonus: string;
  item_level: number;
  crafting_tier?: number;
  lowest_price: number;
  total_quantity: number;
}

export interface AuctionDetailResponse {
  item_id: number;
  item_bonus: string;
  lowest_price: number;
  total_quantity: number;
  current_auctions: Record<string, number>;
  stats: {
    average_lowest_price: number;
    median_lowest_price: number;
    trends: AuctionTrend[];
  };
}

export interface AuctionTrend {
  time: string;
  lowest_price: number;
  total_quantity: number;
}

export interface QualityType {
  value: number;
  label: string;
  color: string;
}

export interface InventoryType {
  value: string;
  label: string;
}

// Wowhead Tooltips 전역 타입
declare global {
  interface Window {
    $WowheadPower?: {
      refreshLinks: (element?: HTMLElement) => void;
    };
  }
}
