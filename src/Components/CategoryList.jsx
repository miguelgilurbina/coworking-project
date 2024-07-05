import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://sxay9vvf7e.execute-api.us-east-2.amazonaws.com/categoryDataGET');
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://sxay9vvf7e.execute-api.us-east-2.amazonaws.com/categoryDataDELETE`);
      // Actualizar el estado eliminando la categoría borrada
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 listStyles" >
      <div className="card w-50">
        <div className="card-body">
          <h1 className="card-title text-center">Category List</h1>
            <ul className="list-group">
            {categories.map((category) => (
            <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                {category.title}
                    <button 
                        className='btn btn-sm  btn-danger'
                        onClick={() => handleDelete(category.id)}>
                        Remove Category
                    </button>
            </li>
                ))}
            </ul>
            <div className='justify-content-center align-items-center d-flex'>
            <Link to="/admin" className="genericButton link-flex">
                Go Back
            </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;