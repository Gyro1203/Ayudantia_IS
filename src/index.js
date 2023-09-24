const express = require('express');
const app = express();
const port = 5000;

app.get('/api', (req, res) => {
  res.send('Hello World!');
})

// Crear nuestra bd en memoria: array de productos

let products = [
    {
        id: 1,
        name: 'laptop',
        price: 1500,
    },
    {
        id: 2,
        name: 'celular',
        price: 500,
    },
    {
        id: 3,
        name: 'tablet',
        price: 1000,
    },
];

// Crear nuestro crud de productos

//Obtener una lista de productos => GET api/products
app.get( '/api/products', function (req, res){
  res.status(200).json({
    messaje: 'Lista de productos',
    data: products,
  });
});

//Obtener un producto por id => GET api/products/:id
app.get( '/api/products/:id', function (request, response){
  const paramId = request.params.id;
  const product = products.find((product) => product.id == paramId);

  if (!product) {
    response.status(404).json({
      messaje: 'Producto no encontrado',
      data: null,
    });
    return;
  }
  response.status(200).json({
    messaje: 'Producto encontrado',
    data: product,
  });
});

// Crear un producto => POST api/products
app.post('/api/products', function (req, res) {
  const product = req.body;
  console.log(req.body);

  if (!product) {
    res.status(400).json({
      message: 'Producto no enviado',
      data: null,
    });
    return;
  }
  products.push(product);

  res.status(201).json({
    message: 'Producto creado',
    data: product,
  });
});

// Actualizar un producto => PUT api/products/:id
app.put('/api/products/:id', function (req, res) {
  const id = req.params.id;
  const product = req.body;

  if (!product) {
    res.status(400).json({
      message: 'Producto no enviado',
      data: null,
    });
    return;
  }

  const index = products.findIndex((product) => product.id == id);

  if (index === -1) {
    res.status(404).json({
      message: 'Producto no encontrado',
      data: null,
    });
    return;
  }

  products[index] = product;

  res.status(200).json({
    message: 'Producto actualizado',
    data: product,
  });
});

// Eliminar un producto => DELETE api/products/:id
app.delete('/api/products/:id', function (req, res) {
  const id = req.params.id;

  const index = products.findIndex((product) => product.id == id);

  if (index === -1) {
    res.status(404).json({
      message: 'Producto no encontrado',
      data: null,
    });
    return;
  }

  products.splice(index, 1);

  res.status(200).json({
    message: 'Producto eliminado',
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})