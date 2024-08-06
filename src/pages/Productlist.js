import React from 'react'
import { Table } from 'antd';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";


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

const Productlist = () => {
  return (
    <div>
      <h3 className='mb-4'>Products</h3>
      <div>
        <Table  columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default Productlist
