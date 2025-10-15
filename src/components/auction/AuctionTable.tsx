import React, { useEffect } from 'react';
import { Table, Tag } from 'antd';
import type { SearchAuctionResponse } from '../../types/index';

interface AuctionTableProps {
  data: SearchAuctionResponse[];
  loading: boolean;
  onViewDetail: (itemId: number, itemBonus: string) => void;
}

const AuctionTable: React.FC<AuctionTableProps> = ({ data, loading, onViewDetail }) => {
  // Wowhead Tooltips 초기화
  useEffect(() => {
    const initializeWowhead = () => {
      // 이미 스크립트가 로드되어 있는지 확인
      const existingScript = document.querySelector('script[src="https://wow.zamimg.com/js/tooltips.js"]');
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://wow.zamimg.com/js/tooltips.js';
        script.async = true;
        script.onload = () => {
          // 스크립트 로드 완료 후 tooltip 초기화
          setTimeout(() => {
            if (window.$WowheadPower && window.$WowheadPower.refreshLinks) {
              window.$WowheadPower.refreshLinks();
            }
          }, 200);
        };
        document.head.appendChild(script);
      } else {
        // 이미 로드된 경우 tooltip 새로고침
        setTimeout(() => {
          if (window.$WowheadPower && window.$WowheadPower.refreshLinks) {
            window.$WowheadPower.refreshLinks();
          }
        }, 100);
      }
    };

    initializeWowhead();
  }, [data]); // 데이터가 변경될 때마다 tooltip 새로고침

  const formatPrice = (price: number) => {
    if (price >= 10000) {
      return `${(price / 10000).toFixed(1)}만`;
    }
    return price.toLocaleString();
  };


  const renderItemName = (record: SearchAuctionResponse) => {
    const itemName = record.item_name?.ko_KR || record.item_name?.en_US || `아이템 ${record.item_id}`;
    const craftingTier = record.crafting_tier;
    
    // Wowhead 툴팁 설정 구성
    const wowheadData = record.item_bonus 
      ? `item=${record.item_id}&bonus=${record.item_bonus}`
      : `item=${record.item_id}`;
    
    return (
      <div 
        className="item-name-container"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          flexWrap: 'wrap',
          padding: '4px 8px',
          borderRadius: '4px'
        }}
        onClick={() => onViewDetail(record.item_id, record.item_bonus)}
      >
        <a
          href={`https://www.wowhead.com/item=${record.item_id}&domain=ko`}
          data-wowhead={wowheadData} 
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {itemName}
        </a>
        {craftingTier && (
          <Tag color="green">
            T{craftingTier}
          </Tag>
        )}
      </div>
    );
  };

  const columns = [
    {
      title: '가격',
      dataIndex: 'lowest_price',
      key: 'lowest_price',
      width: 120,
      sorter: (a: SearchAuctionResponse, b: SearchAuctionResponse) => a.lowest_price - b.lowest_price,
      render: (price: number) => (
        <span style={{ fontWeight: 'bold', color: '#52c41a' }}>
          {formatPrice(price)}골
        </span>
      ),
    },
    {
      title: '아이템 이름',
      key: 'item_name',
      width: 300,
      render: (_: any, record: SearchAuctionResponse) => renderItemName(record),
    },
    {
      title: '구매 가능 수량',
      dataIndex: 'total_quantity',
      key: 'total_quantity',
      width: 120,
      sorter: (a: SearchAuctionResponse, b: SearchAuctionResponse) => a.total_quantity - b.total_quantity,
      render: (quantity: number) => (
        <span style={{ 
          color: quantity > 0 ? '#1890ff' : '#ff4d4f',
          fontWeight: '500'
        }}>
          {quantity.toLocaleString()}개
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={(record) => `${record.item_id}-${record.item_bonus}`}
      pagination={{
        pageSize: 20,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => 
          `${range[0]}-${range[1]} / 총 ${total}개`,
      }}
      scroll={{ x: 500 }}
      size="small"
    />
  );
};

export default AuctionTable;
