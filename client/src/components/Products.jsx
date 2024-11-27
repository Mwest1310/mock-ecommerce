import React, { useState, useEffect } from 'react';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addToCart, removeFromCart, clearAllCart, incrementQuantity, decrementQuantity } from '../slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const formatDescription = (data) => {
        let newArr = [];
        data.map(product => {
            product.description = product.description.split('/n');
            newArr.push(product);
        });
        return newArr;
    };
    const handleAddToCart = (product) => {
        dispatch(addToCart({product, qty: 1}));
        navigate('/cart');
    }
    useEffect(() => {
        const fetchProducts = async() => {
            try {
                const res = await fetch('/api/products/recent');
                const json = await res.json();
                setProducts(json);
            } catch (error) {
               console.log(error); 
            };
        };
        fetchProducts();
    }, [])
  return (
    <section id="products">
        <div className="container">
            <div className="row-container">
            <h2>Latest Products</h2>
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
            <div className="row-container">
                <h2>Categories</h2>
                <div className="row">
                    <div className="product">
                        <img src="/assets/images/clothing.jpg" alt="clothes" />
                        <h3><a href="/category/clothing">Clothing</a></h3>
                    </div>
                    <div className="product">
                        <img src="/assets/images/accessories.jpg" alt="accessories" />
                        <h3><a href="/category/accessories">Accessories</a></h3>
                    </div>
                    <div className="product">
                        <img src="/assets/images/devices.jpg" alt="wait" />
                        <h3><a href="/category/devices">Devices</a></h3>
                    </div>
                    <div className="product">
                        <img src="/assets/images/stationery.jpg" alt="wait" />
                        <h3><a href="/category/stationery">Stationery</a></h3>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
  );
};

export default Products;