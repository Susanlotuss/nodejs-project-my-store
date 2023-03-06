const express = require('express');
const CategoriesService = require('../services/CategoriesService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/productSchema');

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res) => {
  const category = await service.find();
  res.json(category);
});

// Accedemos a esta info en: localhost:3000/categories/50/products/2 (siendo '50' el id de categories y '2' el id de productos)
router.get(
  '/:id',
  // middleware validator, que lleva el schema a validar y donde encontrarlo, si se verifica continuará con la ejecución.
  validatorHandler(getProductSchema, 'params'),
  // middleware que se conecta al servicio.
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
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
      const category = await service.update(id, body);
      res.json(category);
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
