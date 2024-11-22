import React, { useState } from 'react';
import { useCreateMutation } from '../slices/productsApiSlice';
import { toast } from 'react-toastify';

const CreateProductForm = () => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: ''
    });
    const [createProduct, {isLoading}] = useCreateMutation();
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await createProduct(newProduct);
            setNewProduct({name: '', description: '', price: '', category: '', image: ''})
        } catch (err) {
            toast.error(err?.data?.message || err.error);
            console.log(err);
        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct({...newProduct, image: reader.result});
            };
            reader.readAsDataURL(file);
        };
    };
  return (
    <form className="form-container"  onSubmit={handleSubmit}>
        <h3>Create Product</h3>
            <div className="form-div">
                <label for="name">Product name:</label>
                <input type="text" name="name" value={newProduct.name} placeholder="Product name" onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
            </div>
            <div className="form-div">
                <label for="description">Description:</label>
                <textarea name="description" value={newProduct.description} placeholder="Product description" onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} />
            </div>
            <div className="form-div">
                <label for="price">Price:</label>
                <input type="number" name="price" value={newProduct.price} placeholder="Product price" onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} step='0.01' />
            </div>
            <div className="form-div">
                <label for="category">Category:</label>
                <select name="category" value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} required>
                    <option value=''>Select a category</option>
                    <option value='clothing'>Clothing</option>
                    <option value='accessories'>Accessories</option>
                    <option value='devices'>Devices</option>
                    <option value='stationery'>Stationery</option>
                </select>
            </div>
            <div className="form-div">
                <label htmlFor='image'>Upload Image</label>
                <input type='file' onChange={handleImageChange} />
            </div>
            <input type='submit' className="submit" value='Submit Product' />
    </form>
    
  )
}

export default CreateProductForm;