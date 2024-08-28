import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
  },
];

const Brandlist = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Simulate API call
    const products = [
      {
        productID: 29,
        categoryID: 13,
        productName: 'Java Project',
        brand: 'React',
        model: 'Windows',
        price: 100,
        stockQuantity: 20,
        description: '<p>Java Front-End</p>',
        imageURL: 'https://picsum.photos/200',
      },
      {
        productID: 30,
        categoryID: 14,
        productName: 'C#',
        brand: 'VS',
        model: 'MacOS',
        price: 120,
        stockQuantity: 10,
        description: '<p>C# Back-End</p>',
        imageURL: 'https://picsum.photos/200',
      },
      {
        productID: 31,
        categoryID: 15,
        productName: 'SQL',
        brand: 'MSSql',
        model: 'Windows',
        price: 30,
        stockQuantity: 30,
        description: '<p>SQL DataBase</p>',
        imageURL: 'https://picsum.photos/200',
      },
    ];

    const uniqueBrands = Array.from(new Set(products.map(p => p.brand))).map((brand, index) => ({
      key: index,
      brand,
    }));

    setBrands(uniqueBrands);
  }, []);

  return (
    <div>
      <h3 className='mb-4'>Brands</h3>
      <div>
        <Table columns={columns} dataSource={brands} />
      </div>
    </div>
  );
};

export default Brandlist;
