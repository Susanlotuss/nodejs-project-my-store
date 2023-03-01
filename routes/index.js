const express = require('express');

const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');

function routerApi(app) {

  // Se crea un path global para todos los endpoints
  const router = express.Router();
  app.use('/api/v1', router);

  // Se crean los endpoints
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
