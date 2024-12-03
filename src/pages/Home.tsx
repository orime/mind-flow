import React from 'react';
import { Card, Typography, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BookOutlined, ExperimentOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
      <Title style={{ textAlign: 'center', marginBottom: 40 }}>
        欢迎来到思维训练营
      </Title>
      
      <Paragraph style={{ textAlign: 'center', fontSize: 18, marginBottom: 40 }}>
        这里将帮助你建立系统化的思维方式，提升决策和问题解决能力
      </Paragraph>

      <Row gutter={24} justify="center">
        <Col xs={24} sm={12} style={{ marginBottom: 24 }}>
          <Card
            hoverable
            onClick={() => navigate('/protocol')}
            style={{ height: '100%' }}
          >
            <BookOutlined style={{ fontSize: 48, color: '#1890ff', display: 'block', marginBottom: 16 }} />
            <Title level={3}>人类思维协议</Title>
            <Paragraph>
              学习和理解系统化思维的核心原则，掌握科学的思维方法论
            </Paragraph>
            <Button type="primary" onClick={() => navigate('/protocol')}>
              开始学习
            </Button>
          </Card>
        </Col>

        <Col xs={24} sm={12} style={{ marginBottom: 24 }}>
          <Card
            hoverable
            onClick={() => navigate('/practice')}
            style={{ height: '100%' }}
          >
            <ExperimentOutlined style={{ fontSize: 48, color: '#52c41a', display: 'block', marginBottom: 16 }} />
            <Title level={3}>日常实践框架</Title>
            <Paragraph>
              通过具体的实践方法和示例，在日常生活中培养良好的思维习惯
            </Paragraph>
            <Button type="primary" onClick={() => navigate('/practice')} style={{ background: '#52c41a' }}>
              开始练习
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
