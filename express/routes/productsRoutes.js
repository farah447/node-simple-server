import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getSingleProduct } from "../controllers/productsControllers";

const router = Router();

router.get('/products', getAllProducts);

router.get('/products/:id', getSingleProduct);

router.delete('/products/:id', deleteProduct);

router.post('/products/:id', addProduct);

router.put('/products/:id', addProduct);

export default router;