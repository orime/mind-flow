import React from 'react';
import { Card, Typography, List, Steps } from 'antd';
import { thinkingProtocol } from '../data/protocol';

const { Title, Paragraph } = Typography;

const Protocol: React.FC = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
      <Title level={2}>{thinkingProtocol.title}</Title>
      <Paragraph>
        这个协议旨在帮助你建立系统化的思维习惯，提高决策质量和问题解决能力。
      </Paragraph>
      
      <List
        dataSource={thinkingProtocol.sections}
        renderItem={(section) => (
          <Card 
            title={section.title}
            style={{ marginBottom: 16 }}
          >
            <Steps
              direction="vertical"
              current={-1}
              items={section.steps.map((step, index) => ({
                title: `步骤 ${index + 1}`,
                description: step,
              }))}
            />
          </Card>
        )}
      />
    </div>
  );
};

export default Protocol;
