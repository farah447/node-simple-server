import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/productsControllers.js";
import { createProductValidation, updateProductValidation } from '../middleware/productValidation.js';
import { runValidation } from "../middleware/runValidation.js";

const router = Router();

router.get('/', getAllProducts);

router.post('/', createProductValidation, runValidation, addProduct);

router.get('/:id', getSingleProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', updateProductValidation, runValidation, updateProduct);

export default router;