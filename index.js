import http from 'http';

const http = require("http");
const PORT = '8080';

let products = [
  { id: '1', title: 'apple iphone 14', price: 1320 },
  { id: '2', title: 'apple iphone 12', price: 520 }
];

const errorHandelar = (res, statusCode, message) => {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
  res.write(message);
  res.end();
}

const server = http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1> Hello world! </h1>')
    res.end();
  }
  else if (req.url === '/products' && req.method === 'GET') {
    try {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(products));
      res.end();
    } catch (error) {
      errorHandelar(res, 500, 'server error');
    }
  }
  else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'GET') {
    try {
      const id = req.url?.split("/")[2];
      const product = products.find((product) => product.id === id);
      if (!product) {
        errorHandelar(res, 404, `product not found with this ${id}`);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(product));
      res.end();
    } catch (error) {
      errorHandelar(res, 500, 'server error');
    }
  }
  else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'POST') {
    try {
      const id = req.url?.split("/")[2];
      console.log(id);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('prodct is created');
      res.end();
    } catch (error) {
      errorHandelar(res, 500, 'server error');
    }
  }
  else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'DELETE') {
    try {
      const id = req.url?.split("/")[2];
      console.log(id);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('product is deleted');
      res.end();
    } catch (error) {
      errorHandelar(res, 500, 'server error');
    }
  }
  else if (req.url.match(/\/products\/([0-9]+)/) && req.method === 'PUT') {
    try {
      const id = req.url?.split("/")[2];
      console.log(id);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('product is updated');
      res.end();
    } catch (error) {
      errorHandelar(res, 500, 'server error');
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('route not found');
    res.end();
  }

});

server.listen(port, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});