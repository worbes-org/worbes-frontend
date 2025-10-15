import axios from 'axios';
import { API_BASE_URL } from '../constants';
import type { Realm, SearchAuctionRequest, SearchAuctionResponse, AuctionDetailResponse } from '../types/index';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 모킹 데이터 (실제 API가 준비되기 전까지 사용)
const MOCK_REALMS: Realm[] = [
  {
    id: 1,
    name: { ko_KR: '아즈샤라', en_US: 'Azshara' },
    connected_realm_id: 1
  },
  {
    id: 2,
    name: { ko_KR: '듀로탄', en_US: 'Durotan' },
    connected_realm_id: 1
  },
  {
    id: 3,
    name: { ko_KR: '하이잘', en_US: 'Hyjal' },
    connected_realm_id: 2
  },
  {
    id: 4,
    name: { ko_KR: '알렉스트라자', en_US: 'Alexstrasza' },
    connected_realm_id: 2
  },
];

const MOCK_AUCTIONS: SearchAuctionResponse[] = [
  {
    item_id: 19019,
    item_bonus: '100:200:300',
    item_level: 80,
    crafting_tier: 3,
    lowest_price: 500000,
    total_quantity: 12
  },
  {
    item_id: 19020,
    item_bonus: '100:200',
    item_level: 85,
    crafting_tier: 4,
    lowest_price: 750000,
    total_quantity: 8
  },
  {
    item_id: 19021,
    item_bonus: '',
    item_level: 90,
    crafting_tier: 5,
    lowest_price: 1200000,
    total_quantity: 3
  },
];

export const realmService = {
  getRealms: async (region: 'KR'): Promise<Realm[]> => {
    // 실제 API 호출 (현재는 모킹)
    // const response = await api.get(`/realms?region=${region}`);
    // return response.data.content;
    
    // 모킹 데이터 반환
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_REALMS), 500);
    });
  }
};

export const auctionService = {
  searchAuctions: async (params: SearchAuctionRequest): Promise<{
    content: SearchAuctionResponse[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
  }> => {
    // 실제 API 호출 (현재는 모킹)
    // const response = await api.get('/auctions', { params });
    // return response.data;
    
    // 모킹 데이터 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          content: MOCK_AUCTIONS,
          totalElements: MOCK_AUCTIONS.length,
          totalPages: 1,
          page: 0,
          size: 100
        });
      }, 800);
    });
  },

  getAuctionDetail: async (itemId: number, params: {
    region: 'KR';
    realmId: number;
    itemBonus?: string;
  }): Promise<AuctionDetailResponse> => {
    // 실제 API 호출 (현재는 모킹)
    // const response = await api.get(`/auctions/${itemId}`, { params });
    // return response.data.data;
    
    // 모킹 데이터 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          item_id: itemId,
          item_bonus: params.itemBonus || '',
          lowest_price: 500000,
          total_quantity: 12,
          current_auctions: {
            '500000': 5,
            '600000': 4,
            '700000': 3
          },
          stats: {
            average_lowest_price: 580000,
            median_lowest_price: 550000,
            trends: [
              { time: '2025-01-01T10:00:00Z', lowest_price: 520000, total_quantity: 8 },
              { time: '2025-01-02T10:00:00Z', lowest_price: 480000, total_quantity: 10 },
              { time: '2025-01-03T10:00:00Z', lowest_price: 550000, total_quantity: 7 },
              { time: '2025-01-04T10:00:00Z', lowest_price: 600000, total_quantity: 5 },
              { time: '2025-01-05T10:00:00Z', lowest_price: 500000, total_quantity: 12 },
            ]
          }
        });
      }, 600);
    });
  }
};
