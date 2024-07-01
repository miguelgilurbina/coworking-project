import React, { useEffect, useState} from 'react'
import api from '../api/axiosconfig';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect (() => {
        const fetchData = async () => {
            try {
                const response = await api.get("`http://localhost:8080/salas/listar");
                console.log(response.data);
                setProducts(response.data);
                console.log(setProducts);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false)
            }
        }

        fetchData();
    }, []);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/salas/eliminar/${id}`);
            setProducts(products.filter(product => product.id !== id));
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
          <h1 className="card-title text-center">Products List</h1>
            <ul className="list-group">
                {products.map((product) => (
                    <li key={product.id} className='list-group-item d-flex justify-content-between align-items-center'>
                        {product.name}
                        <button
                            className='btn btn-danger btn-sm'
                            onClick={() => handleDelete(product.id)}>
                                Delete Product
                        </button>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductList;