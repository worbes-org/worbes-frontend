import React from 'react';
import { Card, Slider, Select, Checkbox, Space, Divider } from 'antd';
import { QUALITY_TYPES, INVENTORY_TYPES, EXPANSIONS } from '../../constants';

const { Option } = Select;

interface FilterPanelProps {
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
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  return (
    <Card title="필터" size="small" style={{ marginBottom: 16 }}>
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {/* 레벨 범위 */}
        <div>
          <label>레벨 범위</label>
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

        <Divider style={{ margin: '8px 0' }} />

        {/* 등급 필터 */}
        <div>
          <label>등급</label>
          <Space wrap>
            <Select
              placeholder="최소 등급"
              value={filters.minQuality}
              onChange={(value) => onFilterChange('minQuality', value)}
              style={{ width: 120 }}
            >
              {QUALITY_TYPES.map(quality => (
                <Option key={quality.value} value={quality.value}>
                  <span style={{ color: quality.color }}>{quality.label}</span>
                </Option>
              ))}
            </Select>
            <span>~</span>
            <Select
              placeholder="최대 등급"
              value={filters.maxQuality}
              onChange={(value) => onFilterChange('maxQuality', value)}
              style={{ width: 120 }}
            >
              {QUALITY_TYPES.map(quality => (
                <Option key={quality.value} value={quality.value}>
                  <span style={{ color: quality.color }}>{quality.label}</span>
                </Option>
              ))}
            </Select>
          </Space>
        </div>

        <Divider style={{ margin: '8px 0' }} />

        {/* 확장팩 */}
        <div>
          <label>확장팩</label>
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

        <Divider style={{ margin: '8px 0' }} />

        {/* 옵션 */}
        <div>
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
    </Card>
  );
};

export default FilterPanel;











