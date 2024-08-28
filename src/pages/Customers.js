import React, { useState, useEffect } from 'react';
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
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

const Customers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('https://localhost:44309/api/Customer');
        if (response.ok) {
          const customers = await response.json();

          // Map the customer data to match the table's expected format
          const formattedData = customers.map((customer, index) => ({
            key: index,
            name: `${customer.firstName} ${customer.lastName || ''}`,
            age: customer.age || 'N/A', // Assuming there's an age field or default to 'N/A'
            address: `${customer.addressLine1 || ''} ${customer.city || ''} ${customer.state || ''}`,
            email: customer.email || 'N/A', // Add email field
          }));

          setData(formattedData);
        } else {
          console.error('Failed to fetch customer data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <h3 className='mb-4'>Customers</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default Customers;
