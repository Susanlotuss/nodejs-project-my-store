const express = require('express');
const UsersService = require('../services/usersService.js');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/productSchema');

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

// Recoger parametros tipo query (req.query): primero creamos un nuevo endpoint, llamamos parametros tipo query (limit y offset),
// Luego validados si existen, si si existen devolvemos ese valor y si no, enviamos un valor con un 'send' normal, indicando que no hay parametros.
// Lo vemos en: localhost:3000/users y en localhost:3000/users?limit=10&offset=200

router.get('/', async (req, res) => {
  const { limit, offset } = req.query;
  const users = await service.find();
  if (limit && offset) {
    res.json(users);
  } else {
    res.send('No hay parámetros');
  }
});

// Lo vemos en: localhost:3000/users/{id} (el de un user generado con la funcion anterior)
router.get(
  '/:id',
  // middleware validator, que lleva el schema a validar y donde encontrarlo, si se verifica continuará con la ejecución.
  validatorHandler(getProductSchema, 'params'),
  // middleware que se conecta al servicio.
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const users = await service.findOne(id);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

// creamos la forma en como el servidor tratará la petición de tipo POST + http 201-created
router.post(
  '/',
  // middleware validator, que lleva el schema a validar y donde encontrarlo, si se verifica continuará con la ejecución.
  validatorHandler(createProductSchema, 'body'),
  // middleware que se conecta al servicio.
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

// creamos la forma en como el servidor tratará la petición de tipo PATCH
router.patch(
  '/:id',
  // middleware validator, que lleva el schema a validar y donde encontrarlo, si se verifica continuará con la ejecución.
  // Aqui requiere validar tanto params como body, por tanto se indicará la validación con getProductSchema(params) y luego la de updateProductSchema(body).
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  // middleware que se conecta al servicio.
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const users = await service.update(id, body);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

// creamos la forma en como el servidor tratará la petición de tipo DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
