import React, { useState, useEffect } from 'react';
import { Table, message, Select, Button } from 'antd';

const { Option } = Select;

const Roles = () => {
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

      if (loggedInUser) {
        try {
          const response = await fetch(`https://localhost:44309/api/Admin/isAdmin/${loggedInUser.customerID}`);
          if (response.ok) {
            const result = await response.json();
            setIsAdmin(result.isAdmin);
          } else {
            console.error('Failed to check admin status');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    checkAdminStatus();
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('https://localhost:44309/api/Customer');
        if (response.ok) {
          const customers = await response.json();

          const formattedData = customers.map((customer) => ({
            key: customer.customerID,
            customerId: customer.customerID,
            name: `${customer.firstName} ${customer.lastName || ''}`,
            age: customer.dateOfBirth ? calculateAge(customer.dateOfBirth) : 'N/A',
            address: `${customer.addressLine1 || ''} ${customer.city || ''} ${customer.state || ''}`,
            email: customer.email || 'N/A',
            currentRole: customer.role?.roleName || 'No role assigned',
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

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('https://localhost:44309/api/Role');
        if (response.ok) {
          const roles = await response.json();
          setRoles(roles);
        } else {
          console.error('Failed to fetch roles');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRoles();
  }, []);

  const assignRoleToCustomer = async (customerId) => {
    if (!selectedRole) {
      message.error('Please select a role to assign.');
      return;
    }

    try {
      const response = await fetch(`https://localhost:44309/api/Role/assign-role/${customerId}/${selectedRole}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        message.success('Role assigned successfully');
        const updatedCustomer = await response.json();
        setData((prevData) =>
          prevData.map((customer) =>
            customer.customerId === updatedCustomer.customerID ? { ...customer, currentRole: updatedCustomer.role.roleName } : customer
          )
        );
      } else {
        message.error('Failed to assign role');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Error assigning role');
    }
  };

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Current Role',
      dataIndex: 'currentRole',
      key: 'currentRole',
    },
    {
      title: 'Assign Role',
      key: 'assignRole',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Select
            style={{ width: 200 }}
            placeholder="Select role"
            onChange={(value) => setSelectedRole(value)}
            disabled={!isAdmin}
          >
            {roles.map((role) => (
              <Option key={role.roleID} value={role.roleID}>
                {role.roleName}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            onClick={() => assignRoleToCustomer(record.customerId)}
            disabled={!isAdmin}
            style={{ marginLeft: 8, height: '32px', width: '200px' }}
          >
            Assign
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h3 className='mb-4'>Customers</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Roles;
