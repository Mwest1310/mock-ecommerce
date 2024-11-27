import React, { useEffect, useState } from 'react';
import { useFindMutation, useDeleteMutation } from '../slices/productsApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [find, {isLoading}] = useFindMutation();
  const [deleteProduct] = useDeleteMutation();
  useEffect(() => {
    const findProducts = async() => {
      try {
        const res = await find().unwrap();
        setProducts(res.data);
      } catch (error) {
          console.log(error);
      }
    }
    findProducts();
  }, [useFindMutation])
  const dispatch = useDispatch();
  const handleDelete = async(product) => {
    try {
      await deleteProduct(product);
      const newProducts = products.filter((item) => item._id !== product._id);
      setProducts(newProducts)
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <ul id="product-list">
      {products.map((product) => {
        return (
          <li key={product._id} className="cart-item">
            <div>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
            </div>
            <p>£{product.price}</p>
            <button className="delete" onClick={() => handleDelete(product)}><FontAwesomeIcon icon={faTrash} /></button>
          </li>
        )
      })}
    </ul>
  );
};

export default ProductsList;