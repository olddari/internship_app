import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomInput from '../components/CustomInput';

const EditCat = () => {
  const { categoryID } = useParams();
  const [categoryData, setCategoryData] = useState({
    categoryName: '',
    description: ''
  });
  const navigate = useNavigate();

  useEffect(() => {

    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`https://localhost:44309/api/ProductCategory/${categoryID}`);
        if (response.ok) {
          const data = await response.json();
          setCategoryData({
            categoryName: data.categoryName,
            description: data.description
          });
        } else {
          alert('Failed to fetch category data');
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
        alert('Error fetching category data');
      }
    };

    fetchCategoryData();
  }, [categoryID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const updatedCategoryData = { 
            ...categoryData, 
            categoryID 
        };

        const response = await fetch(`https://localhost:44309/api/ProductCategory/${categoryID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCategoryData),
        });

        if (response.ok) {
            alert('Category updated successfully');
            navigate('/admin/list-category'); 
        } else {
            alert('Failed to update category');
        }
    } catch (error) {
        console.error('Error updating category:', error);
        alert('Error updating category');
    }
};


  return (
    <div>
      <h3 className="mb-4">Edit Category ID: {categoryID}</h3>
      <form onSubmit={handleSubmit}>
        <CustomInput
          type="text"
          label="Enter Category"
          name="categoryName"
          val={categoryData.categoryName}
          onChng={handleInputChange}
        />
        <CustomInput
          type="text"
          label="Enter Description"
          name="description"
          val={categoryData.description}
          onChng={handleInputChange}
        />
        <button className="btn-success border-0 rounded-3 mt-3" type="submit">
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditCat;
