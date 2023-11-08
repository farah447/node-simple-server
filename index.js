import http from 'http';
import { parse } from 'querystring';
import fs from 'fs/promises';
import 'dotenv/config';

const PORT = process.env.PORT || 3002;

const errorResponse = (res, statusCode = 500, message = 'server error') => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      message: message,
    }));
}

const successResponse = (res, statusCode, message, payload = {}) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      message: message,
      payload: payload,
    }));
}

const server = http.createServer(async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/' && req.method === 'GET') {
    try {
      successResponse(res, 200, "Hello world!!");
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  }
  else if (req.url === '/products' && req.method === 'GET') {
    try {
      const products = JSON.parse(await fs.readFile('products.json', 'utf-8'));
      successResponse(res, 200, "return all the products", products);
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  }
  else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'GET') {
    try {
      const id = req.url?.split("/")[2];
      const products = JSON.parse(await fs.readFile('products.json', 'utf-8'));
      const product = products.find((product) => product.id === id);
      successResponse(res, 200, "return single product", products);
      if (!product) {
        errorResponse(res, 404, `product not found with this ${id}`);
        return;
      }
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  }
  else if (req.url === "/products" && req.method === 'POST') {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body = body + chunk;
      });
      req.on('end', async () => {
        const data = parse(body);
        console.log(data);
        const newProduct = {
          id: new Date().getTime().toString(),
          title: String(data.title),
          price: Number(data.price),
        }

        const existingProducts = JSON.parse(
          await fs.readFile('products.json', 'utf-8')
        );

        existingProducts.push(newProduct);

        await fs.writeFile("products.json", JSON.stringify(existingProducts));

        successResponse(res, 201, "new product is created");
      });
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  }
  else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'DELETE') {
    try {
      const id = req.url?.split("/")[2];
      const products = JSON.parse(await fs.readFile('products.json', 'utf-8'));
      const product = products.find((product) => product.id === id);
      if (!product) {
        errorResponse(res, 404, `product not found with this ${id}`);
        return;
      }
      const filtereProducts = products.filter((product) => product.id !== id);
      products = filtereProducts;
      successResponse(res, 200, "product is deleted");
    } catch (error) {
      errorResponse(res, 500, 'server error');
    }
  }
  else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'PUT') {
    try {
      const id = req.url?.split("/")[2];
      const products = JSON.parse(await fs.readFile('products.json', 'utf-8'));
      const product = products.find((product) => product.id === id);
      if (!product) {
        errorResponse(res, 404, `product not found with this ${id}`);
        return;
      }
      let body = '';
      req.on('data', (chunk) => {
        body = body + chunk;
      });
      req.on('end', () => {
        const updatedData = parse(body);
        if (String(updatedData.title)) {
          product.title = String(updatedData.title);
        }
        else if (Number(updatedData.price)) {
          product.price = String(updatedData.price);
        }
        successResponse(res, 200, "product is updated", product);
      });
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('route not found');
    res.end();
  }

});

server.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});