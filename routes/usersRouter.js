const express = require('express');
const UsersService = require('../services/UsersService');

const router = express.Router();
const service = new UsersService();


router.get('/',(req,res) => {
  const users = service.find();
  res.json(users);
})

// Recoger parametros tipo query (req.query): primero creamos un nuevo endpoint, llamamos parametros tipo query (limit y offset),
// Luego validados si existen, si si existen devolvemos ese valor y si no, enviamos un valor con un 'send' normal, indicando que no hay parametros.
// Lo vemos en: localhost:3000/users y en localhost:3000/users?limit=10&offset=200

router.get('/', (req, res) => {
  const { limit, offset } = req.query
  const users = service.find();
  if (limit && offset) {
    res.json(users);
  } else {
    res.send('No hay parámetros')
  }
});

// Lo vemos en: localhost:3000/users/{id} (el de un user generado con la funcion anterior)
router.get('/:id', (req, res) => {
  const { id } = req.params
  const users = service.findOne(id);
  res.json(users);
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
  const users = service.update(id, body);
  res.json(users)
});

// creamos la forma en como el servidor tratará la petición de tipo DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const rta = service.delete(id);
  res.json(rta)
})

module.exports = router
