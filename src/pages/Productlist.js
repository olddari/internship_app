import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import { FaRegEdit, FaSearch } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = (search = '') => {
        const url = search 
            ? `https://localhost:44309/api/Application/products/search?searchTerm=${search}` 
            : 'https://localhost:44309/api/Application/products';

        axios.get(url)
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                message.error('Failed to load products.');
                setLoading(false);
            });
    };

    const handleSearch = () => {
        setLoading(true);
        fetchProducts(searchTerm);
    };

    const handleDelete = (productID) => {
        axios.delete(`https://localhost:44309/api/Application/products/${productID}`)
            .then(() => {
                message.success('Product deleted successfully');
                setProducts(products.filter(product => product.productID !== productID));
            })
            .catch(error => {
                message.error('There was an error deleting the product');
                console.error("There was an error deleting the product!", error);
            });
    };

    const columns = [
        { title: 'Product ID', dataIndex: 'productID' },
        { title: 'Category ID', dataIndex: 'categoryID' },
        { title: 'Product Name', dataIndex: 'productName' },
        { title: 'Brand', dataIndex: 'brand' },
        { title: 'Model', dataIndex: 'model' },
        { title: 'Price', dataIndex: 'price', render: (price) => `$${price.toFixed(2)}` },
        { title: 'Stock Quantity', dataIndex: 'stockQuantity' },
        { title: 'Description', dataIndex: 'description' },
        { title: 'Image URL', dataIndex: 'imageURL', render: (url) => <a href={url} target="_blank" rel="noopener noreferrer">View Image</a> },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
                <div>
                    <FaRegEdit 
                        style={{ color: 'green', marginRight: 12, cursor: 'pointer' }} 
                        onClick={() => navigate(`/admin/edit-product/${record.productID}`)} 
                    />
                    <RiDeleteBin6Line 
                        style={{ color: 'red', cursor: 'pointer' }} 
                        onClick={() => handleDelete(record.productID)} 
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className='mb-4'>Products</h3>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        className='mb-4'
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            width: '200px',
                            marginRight: '8px',
                            height: '30px'
                        }}
                    />
                    <FaSearch 
                        onClick={handleSearch} 
                        style={{ cursor: 'pointer', color: '#888', height: '30px', marginRight: '8px' }} 
                        className='mb-3'
                    />
                </div>
            </div>
            <Table 
                columns={columns} 
                dataSource={products} 
                loading={loading} 
                rowKey="productID" 
            />
        </div>
    );
};

export default ProductList;
