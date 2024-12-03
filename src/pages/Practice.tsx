import React from 'react';
import { Card, Typography, List, Steps, Collapse } from 'antd';
import { dailyFramework } from '../data/framework';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const Practice: React.FC = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
      <Title level={2}>{dailyFramework.title}</Title>
      <Paragraph>
        这个框架将帮助你在日常生活中实践系统化思维，培养良好的思维习惯。
      </Paragraph>
      
      <List
        dataSource={dailyFramework.practices}
        renderItem={(practice) => (
          <Card 
            title={practice.title}
            style={{ marginBottom: 16 }}
          >
            <Steps
              direction="vertical"
              current={-1}
              items={practice.steps.map((step, index) => ({
                title: `步骤 ${index + 1}`,
                description: step,
              }))}
            />
            
            <Collapse ghost style={{ marginTop: 16 }}>
              <Panel header="实践示例" key="1">
                <List
                  dataSource={practice.examples}
                  renderItem={(example) => (
                    <List.Item>
                      <Text>{example}</Text>
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
          </Card>
        )}
      />
    </div>
  );
};

export default Practice;
