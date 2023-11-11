import express from "express";
import morgan from 'morgan';
import 'dotenv/config';

import productRoutes from './routes/productsRoutes';

const app = express();
const port = process.env.PORT || 3003;

app.use(morgan.use('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(productRoutes);

app.get('/', (req, res) => {
    res.send('<h1>this is get requset</h1>');
});

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});