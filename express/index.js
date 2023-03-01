const express = require('express');
const faker = require('faker');

//Llamar express
const app = express();

// Indicar en qué puerto
const port = 3000;



// Definir ruta (diferente a la ruta por defecto) - De un GET esperamos una lista de productos - /products es endpoint

app.get('/items', (req, res) => {

  // Respuesta a enviar al cliente, generalmente en formato json ya que es una API. (no renderizamos como tal)

  res.json([
    {
      name: 'producto 1',
      price: 1000,
    },
    {
      name: 'producto 2',
      price: 2000,
    },
  ]);
});

// CASO DE USO
app.get('products/filter', (req, res) => {
  res.send('Yo soy un filter en getQuery.js')
})
// Declaramos un nuevo endpoint + un parametro (id), que puede llevar como nombre solo id o cualquier otro (como productId),
// Pero es importante siempre llamarlo de la misma forma al recibirlo (en req.params).
// Luego accederemos a dicha info en: localhost:3000/products/12 (siendo '12' el id o productId)

app.get('/products/:id', (req, res) => {
  // const id = req.params.id; ó :
  const { id } = req.params;
  res.json({
    id,
    name: 'producto 1',
    price: 1000,
  })
})


// Accedemos a esta info en: localhost:3000/categories/50/products/2 (siendo '50' el id de categories y '2' el id de productos)
app.get('/categories/:id/products/:productsId', (req, res) => {
  const { id, productsId } = req.params;
  res.json({
    id,
    productsId
  })
})

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


// Lista de productos usando fake data (npm i faker@5.5.3 -S)

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
