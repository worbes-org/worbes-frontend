import React from 'react';
import { Layout, Select, Input, Button, Space } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Option } = Select;

interface HeaderProps {
  selectedRealm: number | null;
  onRealmChange: (realmId: number) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onFilterClick: () => void;
  realms: Array<{ id: number; name: { ko_KR: string } }>;
}

const Header: React.FC<HeaderProps> = ({
  selectedRealm,
  onRealmChange,
  searchValue,
  onSearchChange,
  onSearch,
  onFilterClick,
  realms
}) => {
  return (
    <AntHeader style={{ 
      background: '#001529', 
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '24px' }}>
          Worbes
        </h1>
        
        <Select
          placeholder="서버 선택"
          value={selectedRealm}
          onChange={onRealmChange}
          style={{ width: 200 }}
          size="large"
        >
          {realms.map(realm => (
            <Option key={realm.id} value={realm.id}>
              {realm.name.ko_KR}
            </Option>
          ))}
        </Select>
      </div>

      <Space.Compact style={{ width: 500 }}>
        <Input
          placeholder="아이템 검색..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onPressEnter={onSearch}
          size="large"
          prefix={<SearchOutlined />}
        />
        <Button 
          type="primary" 
          size="large"
          onClick={onSearch}
          icon={<SearchOutlined />}
        >
          검색
        </Button>
        <Button 
          size="large"
          onClick={onFilterClick}
          icon={<FilterOutlined />}
        >
          필터
        </Button>
      </Space.Compact>
    </AntHeader>
  );
};

export default Header;
