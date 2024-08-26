import React, { useState } from "react";
import CustomInput from "../components/CustomInput";

const Addcat = () => {
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    description: ""
  });

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
      const response = await fetch("https://localhost:44309/api/ProductCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        alert("Category added successfully");
      } else {
        alert("Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category");
    }
  };

  return (
    <div>
      <h3 className="mb-4">Add Category</h3>
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
          Add Category
        </button>
      </form>
    </div>
  );
};

export default Addcat;
