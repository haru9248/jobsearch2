import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import '../css/Sidebar.css';

interface Category {
  id: number;
  name: string;
}

interface SidebarProps {
  onFilterChange: (filters: { categories: number[]; salary: number | null }) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [salary, setSalary] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosClient.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSalary(e.target.value ? parseInt(e.target.value, 10) : null);
  };

  useEffect(() => {
    onFilterChange({ categories: selectedCategories, salary });
  }, [selectedCategories, salary]);

  return (
    <div className="sidebar-container">
      <div className="side-container">
        <h3>求人カテゴリ</h3>
        {categories.map((category) => (
          <label key={category.id}>
            <input
              type="checkbox"
              value={category.id}
              onChange={() => handleCategoryChange(category.id)}
            />
            {category.name}
          </label>
        ))}
      </div>
      <div className="side-container">
        <h3>年収</h3>
        <select onChange={handleSalaryChange}>
          <option value="300">300万円以上</option>
          <option value="500">500万円以上</option>
          <option value="700">700万円以上</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;