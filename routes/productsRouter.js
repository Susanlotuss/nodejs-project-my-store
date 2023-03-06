const express = require('express');
const ProductsService = require('../services/productsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/productSchema');

const router = express.Router();
const service = new ProductsService();

// CASO DE USO!!! -- los endpoints especificos (/categories/products) deben declararse antes de los dinámicos (/products/:id) de lo contrario se tomará como un id
// (en este caso el filter se entendería como id), no como ruta.
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter en getQuery.js');
});

/*
// Definir ruta (diferente a la ruta por defecto) - De un GET esperamos una lista de productos - /products es endpoint
router.get('/', (req, res) => {

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
*/

// Este sería nuestro find de todos los productos - según logica del negocio-
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

/*// Este sería nuestro find de un producto en específico - según logica del negocio-
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
});*/

// CAPTURANDO ERROR CON MIDDLEWARE ------

router.get(
  '/:id',
  // middleware validator, que lleva el schema a validar y donde encontrarlo, si se verifica continuará con la ejecución.
  validatorHandler(getProductSchema, 'params'),
  // middleware que se conecta al servicio.
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

/*
// Declaramos un nuevo endpoint + un parametro (id), que puede llevar como nombre solo id o cualquier otro (como productId),
// Pero es importante siempre llamarlo de la misma forma al recibirlo (en req.params).
// Luego accederemos a dicha info en: localhost:3000/products/12 (siendo '12' el id o productId)

router.get('/:id', (req, res) => {
  // const id = req.params.id; ó :
  const { id } = req.params;
  res.json({
    id,
    name: 'producto 1',
    price: 1000,
  })
}) */

/*// Para controlar los estatus code de forma dinámica, intentaremos recibir el GET con un 404 not found.
// (Para probarlo en postman, se debe comentar el GET anterior a este).
router.get('/:id', (req, res) => {
  // const id = req.params.id; ó :
  const { id } = req.params;
  if (id === '999') {
    res.status(404).json({
      message: 'Not found'
    });
  } else {
    res.status(200).json({
      id,
      name: 'producto 1',
      price: 1000,
    })
  }
})*/

// Lista de productos usando fake data (npm i faker@5.5.3 -S), lo vemos en: localhost:3000/products y en: localhost:3000/products?size=10
/*router.get('/',(req,res)=> {
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
})*/

// creamos la forma en como el servidor tratará la petición de tipo POST + http 201-created
router.post(
  '/',
  // middleware validator, que lleva el schema a validar y donde encontrarlo, si se verifica continuará con la ejecución.
  validatorHandler(createProductSchema, 'body'),
  // middleware que se conecta al servicio.
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

// creamos la forma en como el servidor tratará la petición de tipo PATCH
router.patch('/:id',
// middleware validator, que lleva el schema a validar y donde encontrarlo, si se verifica continuará con la ejecución.
// Aqui requiere validar tanto params como body, por tanto se indicará la validación con getProductSchema(params) y luego la de updateProductSchema(body).
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
// middleware que se conecta al servicio.
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// creamos la forma en como el servidor tratará la petición de tipo DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
