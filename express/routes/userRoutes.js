import { Router } from "express";
import { getAllUsers } from "../controllers/usersController.js";

const router = Router();

const isLoggedIn = (req, res, next) => {
    if (true) {
        req.body.user = { id: 101, name: 'farah' };
        next()
    } else {
        return res.send("you are not logged in");
    }
};


router.get('/', isLoggedIn, getAllUsers);
router.get('*', (req, res, next) => {
    return res.send("no users route match");
});

/*router.get('/:id', getSingleProduct);

router.delete('/:id', deleteProduct);

router.post('/:id', addProduct);

router.put('/:id', updateProduct);*/

export default router;