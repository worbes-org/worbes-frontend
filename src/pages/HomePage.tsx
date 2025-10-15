import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, message } from 'antd';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import FilterModal from '../components/auction/FilterModal';
import AuctionTable from '../components/auction/AuctionTable';
import AuctionDetailModal from '../components/auction/AuctionDetailModal';
import { realmService, auctionService } from '../services/api';
import type { SearchAuctionRequest, AuctionDetailResponse } from '../types/index';

const { Content, Sider } = Layout;

const HomePage: React.FC = () => {
  // 상태 관리
  const [selectedRealm, setSelectedRealm] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [selectedSubclassId, setSelectedSubclassId] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    levelRange: [1, 999] as [number, number],
    minQuality: 1,
    maxQuality: 6,
    expansionId: null as number | null,
    ignoreVarieties: false,
    onlyBelowVendorPrice: false,
    includeOutOfStock: false,
  });
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    itemId: number;
    itemBonus: string;
  } | null>(null);

  // 서버 목록 조회
  const { data: realms = [], isLoading: realmsLoading } = useQuery({
    queryKey: ['realms', 'KR'],
    queryFn: () => realmService.getRealms('KR'),
  });

  // 경매 검색
  const searchParams: SearchAuctionRequest = {
    region: 'KR',
    realmId: selectedRealm || 0,
    name: searchValue || undefined,
    classId: selectedClassId || undefined,
    subclassId: selectedSubclassId || undefined,
    minItemLevel: filters.levelRange[0],
    maxItemLevel: filters.levelRange[1],
    minQuality: filters.minQuality,
    maxQuality: filters.maxQuality,
    expansionId: filters.expansionId || undefined,
    page: 0,
    size: 100,
  };

  // 테스트용 샘플 데이터
  const sampleData = [
    {
      item_id: 19019,
      item_name: {
        ko_KR: "썬더퓨리, 신의 검",
        en_US: "Thunderfury, Blessed Blade of the Windseeker"
      },
      item_bonus: "450:448",
      item_level: 100,
      crafting_tier: 1,
      lowest_price: 5000000,
      total_quantity: 1
    },
    {
      item_id: 19019,
      item_name: {
        ko_KR: "썬더퓨리, 신의 검",
        en_US: "Thunderfury, Blessed Blade of the Windseeker"
      },
      item_bonus: "450",
      item_level: 100,
      crafting_tier: undefined,
      lowest_price: 3000000,
      total_quantity: 2
    },
    {
      item_id: 19019,
      item_name: {
        ko_KR: "썬더퓨리, 신의 검",
        en_US: "Thunderfury, Blessed Blade of the Windseeker"
      },
      item_bonus: "",
      item_level: 100,
      crafting_tier: undefined,
      lowest_price: 1000000,
      total_quantity: 5
    }
  ];

  const { 
    data: auctionData, 
    isLoading: auctionLoading,
    refetch: refetchAuctions 
  } = useQuery({
    queryKey: ['auctions', searchParams],
    queryFn: () => auctionService.searchAuctions(searchParams),
    enabled: !!selectedRealm,
  });

  // 아이템 상세 조회
  const { 
    data: detailData, 
    isLoading: detailLoading 
  } = useQuery({
    queryKey: ['auctionDetail', selectedItem?.itemId, selectedRealm, selectedItem?.itemBonus],
    queryFn: () => auctionService.getAuctionDetail(
      selectedItem!.itemId, 
      {
        region: 'KR',
        realmId: selectedRealm!,
        itemBonus: selectedItem!.itemBonus,
      }
    ),
    enabled: !!selectedItem && !!selectedRealm,
  });

  // 이벤트 핸들러
  const handleRealmChange = (realmId: number) => {
    setSelectedRealm(realmId);
    message.success(`서버가 변경되었습니다: ${realms.find(r => r.id === realmId)?.name.ko_KR}`);
  };

  const handleSearch = () => {
    if (!selectedRealm) {
      message.warning('서버를 먼저 선택해주세요.');
      return;
    }
    refetchAuctions();
  };

  const handleClassChange = (classId: number | null) => {
    setSelectedClassId(classId);
    setSelectedSubclassId(null);
  };

  const handleSubclassChange = (subclassId: number | null) => {
    setSelectedSubclassId(subclassId);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleFilterClick = () => {
    setFilterModalVisible(true);
  };

  const handleApplyFilters = () => {
    refetchAuctions();
  };

  const handleViewDetail = (itemId: number, itemBonus: string) => {
    setSelectedItem({ itemId, itemBonus });
    setDetailModalVisible(true);
  };

  const handleCloseDetail = () => {
    setDetailModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <Layout style={{ minHeight: '100vh', width: '100%', height: '100vh' }}>
      <Header
        selectedRealm={selectedRealm}
        onRealmChange={handleRealmChange}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearch={handleSearch}
        onFilterClick={handleFilterClick}
        realms={realms}
      />
      
      <Layout style={{ flex: 1, height: 'calc(100vh - 64px)' }}>
        <Sider width={250} style={{ background: '#f5f5f5', height: '100%' }}>
          <Sidebar
            selectedClassId={selectedClassId}
            selectedSubclassId={selectedSubclassId}
            onClassChange={handleClassChange}
            onSubclassChange={handleSubclassChange}
          />
        </Sider>
        
        <Content style={{ padding: '16px', background: '#fff', height: '100%', overflow: 'auto' }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <AuctionTable
                data={auctionData?.content || sampleData}
                loading={auctionLoading}
                onViewDetail={handleViewDetail}
              />
            </Col>
          </Row>
        </Content>
      </Layout>

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
      />

      <AuctionDetailModal
        visible={detailModalVisible}
        onClose={handleCloseDetail}
        data={detailData as AuctionDetailResponse}
        loading={detailLoading}
      />
    </Layout>
  );
};

export default HomePage;
