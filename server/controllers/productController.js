import mongoose from 'mongoose';
import Product from '../models/productModel.js';

const findAllProducts = async(req, res, next) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500);
        next(error);
    };
};

const searchProduct = async(req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || "createdAt";
        const order = req.query.order || "desc";
        const products = await Product.find({
            name: { $regex: searchTerm, $options: "i" }
        })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex)

        return res.status(200).json(products);
    } catch (error) {
        res.status(404);
        next(error);
    };
    
};

const findRecentProducts = async(req, res, next) => {
    try {
        const limit = 9;
        const products = await Product.find({}).sort({ 'updatedAt': 1 }).limit(limit);
        return res.status(200).json(products);
    } catch (error) {
        res.status(500);
        next(error);
    }
}

const findProduct = async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404);
        next(error);
    };
   
};

const createProduct = async(req, res, next) => {
    const product = req.body;
    if(!product.name || !product.price || !product.category || !product.image || !product.description) {
        return res.status(400).json({ success: false, message: 'Please input all fields' });
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(400);
        next(error);
    }
};

const updateProduct = async(req, res, next) => {
    const { id } = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid product it' });
    };
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500);
        next(error);
    }
}

const deleteProduct = async(req, res, next) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product id" });
    };
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        res.status(500);
        next(error);
    };
};

export { findProduct, createProduct, findAllProducts, findRecentProducts, searchProduct, updateProduct, deleteProduct};