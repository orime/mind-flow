import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { 
  HomeOutlined, 
  BookOutlined, 
  ExperimentOutlined, 
  ThunderboltOutlined 
} from '@ant-design/icons'
import { Logo } from './components/Logo'
import Home from './pages/Home'
import Protocol from './pages/Protocol'
import Practice from './pages/Practice'
import Training from './pages/Training'

const { Header, Content } = Layout

const AppLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center',
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        padding: 0,
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
      }}>
        <Logo />
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{ flex: 1, border: 'none' }}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: '/',
              icon: <HomeOutlined />,
              label: '首页',
            },
            {
              key: '/protocol',
              icon: <BookOutlined />,
              label: '思维协议',
            },
            {
              key: '/practice',
              icon: <ExperimentOutlined />,
              label: '实践框架',
            },
            {
              key: '/training',
              icon: <ThunderboltOutlined />,
              label: '思维训练',
            },
          ]}
        />
      </Header>
      <Content style={{ 
        padding: '24px',
        background: '#fff',
        margin: '24px',
        borderRadius: '8px',
        minHeight: 'calc(100vh - 64px - 48px)',
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/protocol" element={<Protocol />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/training" element={<Training />} />
        </Routes>
      </Content>
    </Layout>
  )
}

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  )
}

export default App
