import React, { useState } from 'react';
import { Collapse, Menu } from 'antd';
import { ITEM_CLASSES } from '../../constants';

const { Panel } = Collapse;

interface SidebarProps {
  selectedClassId: number | null;
  selectedSubclassId: number | null;
  onClassChange: (classId: number | null) => void;
  onSubclassChange: (subclassId: number | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedClassId,
  selectedSubclassId,
  onClassChange,
  onSubclassChange
}) => {
  const handleClassClick = (classId: number) => {
    if (classId === 0) {
      onClassChange(null);
      onSubclassChange(null);
    } else {
      onClassChange(classId);
      onSubclassChange(null);
    }
  };

  const handleSubclassClick = (subclassId: number) => {
    onSubclassChange(subclassId === 0 ? null : subclassId);
  };

  return (
    <div style={{ background: '#f5f5f5', height: '100%', padding: '16px' }}>
      <Collapse
        ghost
        expandIconPosition="end"
        style={{ background: 'transparent' }}
      >
        {ITEM_CLASSES.filter(itemClass => itemClass.id !== 0).map(itemClass => (
          <Panel
            key={itemClass.id.toString()}
            header={
              <div 
                onClick={() => handleClassClick(itemClass.id)}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: selectedClassId === itemClass.id ? 'bold' : 'normal',
                  color: selectedClassId === itemClass.id ? '#1890ff' : '#000',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '16px', marginRight: '8px' }}>
                  {itemClass.icon}
                </span>
                {itemClass.name}
              </div>
            }
            style={{ 
              marginBottom: '4px',
              background: selectedClassId === itemClass.id ? '#e6f7ff' : '#fff',
              borderRadius: '6px',
              border: selectedClassId === itemClass.id ? '1px solid #91d5ff' : '1px solid #d9d9d9'
            }}
          >
            {itemClass.subclasses && (
              <Menu
                mode="inline"
                selectedKeys={selectedSubclassId ? [selectedSubclassId.toString()] : ['0']}
                style={{ 
                  background: 'transparent', 
                  border: 'none',
                  marginTop: '8px'
                }}
              >
                {itemClass.subclasses.map(subclass => (
                  <Menu.Item 
                    key={subclass.id.toString()}
                    onClick={() => handleSubclassClick(subclass.id)}
                    style={{ 
                      marginBottom: '2px',
                      borderRadius: '4px',
                      paddingLeft: '16px',
                      fontSize: '14px',
                      fontWeight: selectedSubclassId === subclass.id ? 'bold' : 'normal',
                      background: selectedSubclassId === subclass.id ? '#f0f0f0' : 'transparent'
                    }}
                  >
                    {subclass.name}
                  </Menu.Item>
                ))}
              </Menu>
            )}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Sidebar;
