import React from 'react';
import { Modal, Slider, Select, Checkbox, Space, Divider, Row, Col, Button } from 'antd';
import { QUALITY_TYPES, EXPANSIONS } from '../../constants';

const { Option } = Select;

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: {
    levelRange: [number, number];
    minQuality: number;
    maxQuality: number;
    expansionId: number | null;
    ignoreVarieties: boolean;
    onlyBelowVendorPrice: boolean;
    includeOutOfStock: boolean;
  };
  onFilterChange: (key: string, value: any) => void;
  onApplyFilters: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ 
  visible, 
  onClose, 
  filters, 
  onFilterChange, 
  onApplyFilters 
}) => {
  const handleApply = () => {
    onApplyFilters();
    onClose();
  };

  return (
    <Modal
      title="필터 옵션"
      open={visible}
      onCancel={onClose}
      width={600}
      footer={[
        <Button key="reset" onClick={() => {
          onFilterChange('levelRange', [1, 999]);
          onFilterChange('minQuality', 1);
          onFilterChange('maxQuality', 6);
          onFilterChange('expansionId', null);
          onFilterChange('ignoreVarieties', false);
          onFilterChange('onlyBelowVendorPrice', false);
          onFilterChange('includeOutOfStock', false);
        }}>
          초기화
        </Button>,
        <Button key="cancel" onClick={onClose}>
          취소
        </Button>,
        <Button key="apply" type="primary" onClick={handleApply}>
          적용
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {/* 레벨 범위 */}
        <div>
          <h4>레벨 범위</h4>
          <Slider
            range
            min={1}
            max={999}
            value={filters.levelRange}
            onChange={(value) => onFilterChange('levelRange', value)}
            marks={{
              1: '1',
              500: '500',
              999: '999'
            }}
          />
        </div>

        <Divider />

        {/* 등급 필터 */}
        <div>
          <h4>등급</h4>
          <Row gutter={16}>
            <Col span={12}>
              <label>최소 등급</label>
              <Select
                placeholder="최소 등급"
                value={filters.minQuality}
                onChange={(value) => onFilterChange('minQuality', value)}
                style={{ width: '100%' }}
              >
                {QUALITY_TYPES.map(quality => (
                  <Option key={quality.value} value={quality.value}>
                    <span style={{ color: quality.color }}>{quality.label}</span>
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={12}>
              <label>최대 등급</label>
              <Select
                placeholder="최대 등급"
                value={filters.maxQuality}
                onChange={(value) => onFilterChange('maxQuality', value)}
                style={{ width: '100%' }}
              >
                {QUALITY_TYPES.map(quality => (
                  <Option key={quality.value} value={quality.value}>
                    <span style={{ color: quality.color }}>{quality.label}</span>
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </div>

        <Divider />

        {/* 확장팩 */}
        <div>
          <h4>확장팩</h4>
          <Select
            placeholder="모든 확장팩"
            value={filters.expansionId}
            onChange={(value) => onFilterChange('expansionId', value)}
            style={{ width: '100%' }}
            allowClear
          >
            {EXPANSIONS.map(expansion => (
              <Option key={expansion.value} value={expansion.value}>
                {expansion.label}
              </Option>
            ))}
          </Select>
        </div>

        <Divider />

        {/* 옵션 */}
        <div>
          <h4>기타 옵션</h4>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Checkbox
              checked={filters.ignoreVarieties}
              onChange={(e) => onFilterChange('ignoreVarieties', e.target.checked)}
            >
              변형 무시
            </Checkbox>
            <Checkbox
              checked={filters.onlyBelowVendorPrice}
              onChange={(e) => onFilterChange('onlyBelowVendorPrice', e.target.checked)}
            >
              상인 가격 이하만
            </Checkbox>
            <Checkbox
              checked={filters.includeOutOfStock}
              onChange={(e) => onFilterChange('includeOutOfStock', e.target.checked)}
            >
              품절 포함
            </Checkbox>
          </Space>
        </div>
      </Space>
    </Modal>
  );
};

export default FilterModal;











