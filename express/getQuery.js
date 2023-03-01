const express = require('express');
const faker = require('faker');

//Llamar express
const app = express();

// Indicar en qué puerto
const port = 3000;


// Recoger parametros tipo query (req.query): primero creamos un nuevo endpoint, llamamos parametros tipo query (limit y offset),
// Luego validados si existen, si si existen devolvemos ese valor y si no, enviamos un valor con un 'send' normal, indicando que no hay parametros.
// Lo vemos en: localhost:3000/users y en localhost:3000/users?limit=10&offset=200

app.get('/users', (req, res) => {
  const { limit, offset } = req.query
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay parámetros')
  }
});


// Lista de productos usando fake data (npm i faker@5.5.3 -S), lo vemos en: localhost:3000/products y en: localhost:3000/products?size=10
app.get('/products',(req,res)=> {
  const products = [];

  // Aqui capturamos los parametros que requerimos
  const { size } = req.query;

  // si viene el tamaño nos lo mostrará, si no nos generará por defecto 10 productos
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
})


// App escuchará un puerto en especifico
app.listen(port, () => {
  console.log('Mi port ' + port);
});
