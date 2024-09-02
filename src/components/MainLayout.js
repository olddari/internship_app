import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Layout, Menu, theme } from 'antd';
import { AiOutlineDashboard } from "react-icons/ai";
import { IoBagOutline } from "react-icons/io5";
import { TbBrandDatabricks } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";
import { LuUser2 } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaUserShield } from "react-icons/fa";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className='logo-corner'>
          <h2 className='text-white fs-3 text-center py-3 mb-0'>Logo</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key == 'signout') {

            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <LuUser2 className='fs-4' />,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <IoBagOutline className='fs-4' />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <IoBagOutline className='fs-5' />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <IoBagOutline className='fs-5' />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <TbBrandDatabricks className='fs-5' />,
                  label: 'Brand',
                },
                {
                  key: 'list-brand',
                  icon: <TbBrandDatabricks className='fs-5' />,
                  label: 'Brand List',
                },
                {
                  key: 'category',
                  icon: <BiCategory className='fs-5' />,
                  label: 'Category',
                },
                {
                  key: 'list-category',
                  icon: <BiCategory className='fs-5' />,
                  label: 'Category List',
                },
              ]
            },
            {
              key: 'orders',
              icon: <GoChecklist className='fs-4' />,
              label: 'Orders',
            },
            {
              key: 'roles', 
              icon: <FaUserShield className='fs-4' />,
              label: 'Roles',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className='d-flex justify-content-between ps-0 pe-4'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <IoIosArrowForward className='fs-5' /> : <IoIosArrowBack className='fs-5' />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              margin: '0px',
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className='d-flex gap-3 align-items-center'>
            <div></div>
            <div className='d-flex gap-2 align-items-center'>
              <div>
                <img className='user-img' src='https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_male_user-512.png' />
              </div>
              <div role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                <h5 className='fs-5 mb-0'>admin</h5>
                <p className='mb-0'>admin@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><Link className="dropdown-item py-1 mb-1" style={{ height: "auto", lineHeight: "20px" }} to="/">View Profile</Link></li>
                <li><Link className="dropdown-item py-1 mb-1" style={{ height: "auto", lineHeight: "20px" }} to="/">Signout</Link></li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
