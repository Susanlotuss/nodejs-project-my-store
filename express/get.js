const express = require('express');

//Llamar express
const app = express();

// Indicar en qué puerto
const port = 3000;

// CASO DE USO!!! -- los endpoints especificos (/categories/products) deben declararse antes de los dinámicos (/products/:id) de lo contrario se tomará como un id
// (en este caso el filter se entendería como id), no como ruta.
app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filter en getQuery.js')
})


// Definir ruta (diferente a la ruta por defecto) - De un GET esperamos una lista de productos - /products es endpoint
app.get('/products', (req, res) => {

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


// Declaramos un nuevo endpoint + un parametro (id), que puede llevar como nombre solo id o cualquier otro (como productId),
// Pero es importante siempre llamarlo de la misma forma al recibirlo (en req.params).
// Luego accederemos a dicha info en: localhost:3000/products/12 (siendo '12' el id o productId)

app.get('/products/:productId', (req, res) => {
  // const productId = req.params.productId; ó :
  const { productId } = req.params;
  res.json({
    productId,
    name: 'producto 1',
    price: 1000,
  })
})


// Accedemos a esta info en: localhost:3000/categories/50/products/2 (siendo '50' el id de categories y '2' el id de productos)
app.get('/categories/:id/products/:productId', (req, res) => {
  const { id, productId } = req.params;
  res.json({
    id,
    productId
  })
})


// App escuchará un puerto en especifico

app.listen(port, () => {
  console.log('Mi port ' + port);
});
