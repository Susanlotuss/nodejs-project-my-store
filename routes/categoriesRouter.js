const express = require('express');
const CategoriesService = require('../services/CategoriesService');

const router = express.Router();
const service = new CategoriesService();

router.get('/',(req,res) => {
  const category = service.find();
  res.json(category);
})

// Accedemos a esta info en: localhost:3000/categories/50/products/2 (siendo '50' el id de categories y '2' el id de productos)
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.findOne(id);
  res.json(category)
});


// creamos la forma en como el servidor tratará la petición de tipo POST + http 201-created
router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct)
})

// creamos la forma en como el servidor tratará la petición de tipo PATCH
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const category = service.update(id, body);
  res.json(category)
});

// creamos la forma en como el servidor tratará la petición de tipo DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const rta = service.delete(id);
  res.json(rta)
})
module.exports = router
