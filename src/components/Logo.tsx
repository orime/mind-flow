import React from 'react';
import { Typography } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';

const { Title } = Typography;

export const Logo: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '0 16px',
    }}>
      <ThunderboltFilled style={{ 
        fontSize: '24px',
        background: 'linear-gradient(45deg, #1677ff, #69b1ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }} />
      <Title level={4} style={{ 
        margin: 0,
        background: 'linear-gradient(45deg, #1677ff, #69b1ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Mind Flow
      </Title>
    </div>
  );
};
