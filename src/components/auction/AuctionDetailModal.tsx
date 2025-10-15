import React from 'react';
import { Modal, Descriptions, Table, Card, Statistic, Row, Col } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { AuctionDetailResponse } from '../../types/index';

interface AuctionDetailModalProps {
  visible: boolean;
  onClose: () => void;
  data: AuctionDetailResponse | null;
  loading: boolean;
}

const AuctionDetailModal: React.FC<AuctionDetailModalProps> = ({
  visible,
  onClose,
  data,
  loading
}) => {
  const formatPrice = (price: number) => {
    if (price >= 10000) {
      return `${(price / 10000).toFixed(1)}만`;
    }
    return price.toLocaleString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const currentAuctionsColumns = [
    {
      title: '가격',
      dataIndex: 'price',
      key: 'price',
      render: (price: string) => (
        <span style={{ fontWeight: 'bold', color: '#52c41a' }}>
          {formatPrice(Number(price))}골
        </span>
      ),
    },
    {
      title: '수량',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number) => (
        <span style={{ color: quantity > 0 ? '#1890ff' : '#ff4d4f' }}>
          {quantity}
        </span>
      ),
    },
  ];

  const currentAuctionsData = data?.current_auctions 
    ? Object.entries(data.current_auctions).map(([price, quantity]) => ({
        price,
        quantity,
        key: price,
      }))
    : [];

  const trendData = data?.stats.trends.map(trend => ({
    ...trend,
    date: formatDate(trend.time),
    priceFormatted: formatPrice(trend.lowest_price),
  })) || [];

  return (
    <Modal
      title={`아이템 상세 정보 - ${data?.item_id}`}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      loading={loading}
    >
      {data && (
        <div>
          {/* 기본 정보 */}
          <Card title="기본 정보" size="small" style={{ marginBottom: 16 }}>
            <Descriptions column={2} size="small">
              <Descriptions.Item label="아이템 ID">{data.item_id}</Descriptions.Item>
              <Descriptions.Item label="보너스">
                {data.item_bonus || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="현재 최저가">
                <span style={{ fontWeight: 'bold', color: '#52c41a', fontSize: '16px' }}>
                  {formatPrice(data.lowest_price)}골
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="총 수량">
                <span style={{ color: '#1890ff', fontSize: '16px' }}>
                  {data.total_quantity}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* 통계 정보 */}
          <Card title="14일 통계" size="small" style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="평균 최저가"
                  value={data.stats.average_lowest_price}
                  formatter={(value) => formatPrice(Number(value)) + '골'}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="중앙값 최저가"
                  value={data.stats.median_lowest_price}
                  formatter={(value) => formatPrice(Number(value)) + '골'}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
            </Row>
          </Card>

          {/* 현재 경매 현황 */}
          <Card title="현재 경매 현황" size="small" style={{ marginBottom: 16 }}>
            <Table
              columns={currentAuctionsColumns}
              dataSource={currentAuctionsData}
              pagination={false}
              size="small"
            />
          </Card>

          {/* 가격 트렌드 차트 */}
          <Card title="14일 가격 트렌드" size="small">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => formatPrice(value)}
                />
                <Tooltip 
                  formatter={(value: any, name: string) => [
                    name === 'lowest_price' ? formatPrice(value) + '골' : value,
                    name === 'lowest_price' ? '최저가' : '수량'
                  ]}
                  labelFormatter={(label) => `날짜: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="lowest_price" 
                  stroke="#52c41a" 
                  strokeWidth={2}
                  dot={{ fill: '#52c41a', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}
    </Modal>
  );
};

export default AuctionDetailModal;
