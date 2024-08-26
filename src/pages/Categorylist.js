import React, { useState, useEffect } from 'react';
import { Table, message, Popconfirm } from 'antd';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Categorylist = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('https://localhost:44309/api/ProductCategory')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

  const handleDelete = (categoryID) => {
    axios.delete(`https://localhost:44309/api/ProductCategory/${categoryID}`)
      .then(() => {
        message.success('Category deleted successfully');
        setCategories(categories.filter(category => category.categoryID !== categoryID));
      })
      .catch(error => {
        message.error('There was an error deleting the category');
        console.error("There was an error deleting the category!", error);
      });
  };

  const handleEdit = (categoryID) => {
    navigate(`/admin/editCat/${categoryID}`);
  };

  const columns = [
    {
      title: 'Category ID',
      dataIndex: 'categoryID',
      key: 'categoryID',
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <FaRegEdit 
            style={{ marginRight: 12, color: 'green', cursor: 'pointer' }} 
            onClick={() => handleEdit(record.categoryID)} 
          />
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => handleDelete(record.categoryID)}
            okText="Yes"
            cancelText="No"
          >
            <RiDeleteBin6Line 
              style={{ color: 'red', cursor: 'pointer' }} 
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h3 className='mb-4'>Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={categories} rowKey="categoryID" />
      </div>
    </div>
  );
}

export default Categorylist;
