import Link from 'next/link';
import { Menu } from 'antd';
import { HomeOutlined, FileOutlined, ApiOutlined } from '@ant-design/icons';

const { Item } = Menu;

function Home() {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} style={{ lineHeight: '64px', height: '80px' }}>
      <Item key="home" icon={<HomeOutlined />} style={{ fontSize: '18px' }}>
        <Link href="/">Home</Link>
      </Item>
      <Item key="entries" icon={<FileOutlined />} style={{ fontSize: '18px' }}>
        <Link href="/entries">Test for Enteries</Link>
      </Item>
      <Item key="hipolabs" icon={<ApiOutlined />} style={{ fontSize: '18px' }}>
        <Link href="/hipolabs">Test For Hipolabs</Link>
      </Item>
    </Menu>
  );
}

export default Home;
