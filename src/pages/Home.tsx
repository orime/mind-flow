import React from 'react';
import { Typography, Card, Button, Row, Col } from 'antd';
import { ThunderboltOutlined, RocketOutlined, BookOutlined, ExperimentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ThunderboltOutlined style={{ fontSize: '24px' }} />,
      title: '思维训练',
      description: '通过系统化的思维训练提升分析和解决问题的能力',
      path: '/training',
      color: '#1677ff'
    },
    {
      icon: <BookOutlined style={{ fontSize: '24px' }} />,
      title: '思维协议',
      description: '学习和掌握结构化的思维方法和框架',
      path: '/protocol',
      color: '#52c41a'
    },
    {
      icon: <ExperimentOutlined style={{ fontSize: '24px' }} />,
      title: '实践框架',
      description: '在实际场景中应用和验证思维方法',
      path: '/practice',
      color: '#722ed1'
    }
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <Title>
          Mind Flow
          <RocketOutlined style={{ marginLeft: 16, color: '#1677ff' }} />
        </Title>
        <Paragraph style={{ fontSize: 18, color: '#666' }}>
          系统化的思维训练平台，帮助你建立清晰的思维模式
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} style={{ marginTop: 40 }}>
        {features.map((feature, index) => (
          <Col xs={24} sm={24} md={8} key={index}>
            <Card
              hoverable
              style={{ height: '100%' }}
              onClick={() => navigate(feature.path)}
            >
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ 
                  color: feature.color,
                  marginBottom: 16,
                  transform: 'scale(1.5)'
                }}>
                  {feature.icon}
                </div>
                <Title level={3} style={{ marginTop: 16 }}>
                  {feature.title}
                </Title>
                <Paragraph style={{ color: '#666' }}>
                  {feature.description}
                </Paragraph>
                <Button 
                  type="primary"
                  icon={feature.icon}
                  style={{ 
                    marginTop: 16,
                    backgroundColor: feature.color,
                    borderColor: feature.color
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(feature.path);
                  }}
                >
                  开始{feature.title}
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
