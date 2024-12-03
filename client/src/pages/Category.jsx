import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../slices/cartSlice';

const Category = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async() => {
      try {
          const res = await fetch('/api/products');
          const json = await res.json();
          setProducts(json.data.filter((product) => product.category === id));
      } catch (error) {
          console.log(error);
      };
    };
    fetchProducts();
  }, []);
  const handleAddToCart = (product) => {
    dispatch(addToCart({product, qty: 1}));
    navigate('/cart');
}
  return (
    <div id="category-page" className="page">
      <div className="container">
        <div className="row-container">
          <div className="row">
          {products.map((product) => {
          return (
            <div key={product._id} className="product">
              <img src={product.image} />
              <h3>{product.name}</h3>
              <h4>£{product.price}</h4>
              <button onClick={() => handleAddToCart(product)}>Add to basket <FontAwesomeIcon icon={faBasketShopping} /></button>
            </div>
        )
      })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;