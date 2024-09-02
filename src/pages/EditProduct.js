import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
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
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:44309/api/Application/products/${id}`);
        const product = response.data;
        setTitle(product.productName);
        setDesc(product.description);
        setPrice(product.price.toString());
        setStockQuantity(product.stockQuantity.toString());
        setBrand(product.brand);
        setModel(product.model);
        setImageUrl(product.imageURL);
        setSelectedCategory(product.categoryID.toString());
      } catch (error) {
        console.error('Error fetching product:', error);
        message.error('Failed to fetch product details.');
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://localhost:44309/api/ProductCategory');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleDesc = (value) => {
    setDesc(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      productName: title,
      categoryID: parseInt(selectedCategory, 10),
      brand: brand,
      model: model,
      price: parseFloat(price),
      stockQuantity: parseInt(stockQuantity, 10),
      description: desc,
      imageURL: imageUrl
    };

    try {
      await axios.put(`https://localhost:44309/api/Application/products/${id}`, productData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      message.success('Product updated successfully!');
      navigate('/admin/product-list');
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
      message.error('Failed to update product.');
    }
  };

  return (
    <div>
      <h3 className='mb-4'>Edit Product</h3>
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
        <button className='btn btn-success border-0 rounded-3 my-3' type='submit'>Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
