import React from 'react';
import { Column } from '@ant-design/plots';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
  const data = [
    { type: '1-3秒', value: 0.16 },
    { type: '4-10秒', value: 0.125 },
    { type: '11-30秒', value: 0.24 },
    { type: '31-60秒', value: 0.19 },
    { type: '1-3分', value: 0.22 },
    { type: '3-10分', value: 0.05 },
    { type: '10-30分', value: 0.01 },
    { type: '30+分', value: 0.015 },
  ];

  const config = {
    data,
    xField: 'type',
    yField: 'value',
    color: ({ type }) => {
      if (type === '10-30分' || type === '30+分') {
        return '#22CBCC';
      }
      return '#2989FF';
    },
    label: {
      position: 'top', // or use a supported position
      content: (originData) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
        return '';
      },
      style: {
        fill: '#fff',
      },
    },
    legend: false,
  };

  return (
    <div>
      <h3 className='mb-4'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='dash-graph d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p>Total</p>
            <h4 className='mb-0'>1919 TL</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6>%19</h6>
            <p className='mb-0'>Compare To 2023</p>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p>Total</p>
            <h4 className='mb-0'>1919 TL</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6>%19</h6>
            <p className='mb-0'>Compare To 2023</p>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p>Total</p>
            <h4 className='mb-0'>1919 TL</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6>%19</h6>
            <p className='mb-0'>Compare To 2023</p>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='mb-4'>Statistics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='mb-4'>Recent Orders</h3>
        <div>
        <Table  columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
