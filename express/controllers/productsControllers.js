import fs from "fs/promises";
import { successResponse } from "./responseControllers.js";

let products = [
    { id: '1', title: ' product 1', price: 150 },
    { id: '2', title: ' product 2', price: 250 },
];

export const getAllProducts = async (req, res) => {
    try {
        const products = JSON.parse(await fs.readFile('products.json', 'utf-8'));
        const maxPrice = req.query.maxPrice;
        let filterProduct;

        if (maxPrice) {
            filterProduct = products.filter((product) => product.price <= maxPrice)
            successResponse(res, 200, 'all the products is returned based on maximum price', filterProduct);
        } else {
            successResponse(res, 200, 'all the products is returned', products);
        }
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}

export const getSingleProduct = (req, res) => {
    const id = req.params.id;
    const product = products.find((product) => product.id === id);
    if (!product) {
        errorResponse(res, 404, `product is not found with the id ${id}`);
        return;
    }
    successResponse(res, 200, 'single product is returned', product);
}

export const deleteProduct = (req, res) => {
    const id = req.params.id;
    const product = products.find((product) => product.id === id);
    if (!product) {
        errorResponse(res, 404, `product is not found with the id ${id}`);
        return;
    }
    const filterProducts = products.filter((product) => product.id !== id);
    products = filterProducts;

    successResponse(res, 200, 'product is deleted');
}

export const addProduct = (req, res) => {
    console.log(req.body);
    const newProduct = {
        id: new Date().getTime().toString(),
        title: req.body.title,
        price: req.body.price,
    };
    products.push(newProduct);
    successResponse(res, 201, 'product is added');
}

export const updateProduct = (req, res) => {
    const id = req.params.id;
    const { title, price } = req.body;

    const index = products.findIndex((product) => product.id === id);
    if (index === -1) {
        errorResponse(res, 404, `product is not found with the id ${id}`);
        return;
    }
    if (title) {
        products[index].title = title;
    }
    if (price) {
        products[index].price = price;
    }
    successResponse(res, 200, 'product is updated', products[index]);
}