import express from "express";
import morgan from 'morgan';
import path from "path";
import 'dotenv/config';
import cors from 'cors';
import productRoutes from './routes/productsRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});

app.use((req, res, next) => {
    res.status(404).json({
        message: "something broke",
    });
});

app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
    });
});

/*const isLoggedIn = (req, res, next) => {
    const login = true;
    if (login) {
        next()
    }
    return res.send("please login first");
};

const isAdmin = (req, res, next) => {
    const admin = true;
    if (admin) {
        next()
    }
    return res.send("sorry you are not admin");
};

app.get('/orders', isLoggedIn, isAdmin, (req, res) => {
    return res.json({
        orders: [{ id: 1, name: "oreder 1" }]
    });
});

app.get('/', (req, res) => {
    const filePath = path.resolve('./views/index.html');
    res.sendFile(filePath);
});
*/