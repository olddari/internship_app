import React, { useState, useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { message } from 'antd';
import axios from 'axios';

const Addproduct = () => {
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://localhost:44309/api/ProductCategory');
        console.log('Categories fetched:', response.data);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleDesc = (value) => {
    setDesc(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ProductName: title,
      CategoryID: parseInt(selectedCategory, 10),
      Brand: brand,
      Model: model,
      Price: parseFloat(price),
      StockQuantity: parseInt(stockQuantity, 10),
      Description: desc,
      ImageURL: imageUrl
    };

    try {
      await axios.post('https://localhost:44309/api/application/products', productData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      message.success('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data : error.message);
      message.error('Failed to add product.');
    }
  };

  return (
    <div>
      <h3 className='mb-4'>Add Product</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-floating mt-3'>
          <input
            type='text'
            className='form-control'
            id='productName'
            placeholder='Enter Product Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor='productName'>Enter Product Title</label>
        </div>
        <div className='mt-3'>
          <ReactQuill theme="snow" value={desc} onChange={handleDesc} />
        </div>
        <div className='form-floating mt-3'>
          <input
            type='text'
            className='form-control'
            id='productPrice'
            placeholder='Enter Product Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor='productPrice'>Enter Product Price</label>
        </div>
        <div className='form-floating mt-3'>
          <input
            type='text'
            className='form-control'
            id='stockQuantity'
            placeholder='Enter Stock Quantity'
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
          />
          <label htmlFor='stockQuantity'>Enter Stock Quantity</label>
        </div>
        <div className='form-floating mt-3'>
          <input
            type='text'
            className='form-control'
            id='brand'
            placeholder='Enter Brand'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <label htmlFor='brand'>Enter Brand</label>
        </div>
        <div className='form-floating mt-3'>
          <input
            type='text'
            className='form-control'
            id='model'
            placeholder='Enter Model'
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <label htmlFor='model'>Enter Model</label>
        </div>
        <div className='form-floating mt-3'>
          <input
            type='text'
            className='form-control'
            id='imageUrl'
            placeholder='Enter Image URL'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <label htmlFor='imageUrl'>Enter Image URL</label>
        </div>
        <select name='category' className='form-control py-3 mb-3 mt-3' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value=''>Select Category</option>
          {categories.map(category => (
            <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
          ))}
        </select>
        <button className='btn btn-success border-0 rounded-3 my-3' type='submit'>Add Product</button>
      </form>
    </div>
  );
};

export default Addproduct;
