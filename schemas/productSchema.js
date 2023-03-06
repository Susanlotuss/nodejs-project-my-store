const Joi = require('joi');

// Schema para cada campo. Se inicia con el tipo de campo (string) y luego la validación(uuid).
const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

// Podemos ahora crear un schema para la actualización. Aquí podemos decir que los datos no son requeridos.
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

// Así en este caso solo tenga un campo, es mejor dejarlo como objeto.
const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
