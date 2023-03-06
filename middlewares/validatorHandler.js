const boom = require('@hapi/boom')

// Recibirá entonces el schema a validar y la propiedad, (Este será un middleware dinámico).
// Se evaluará de cada request de alguna propiedad en específico, (body, params o query) sacar del request esa info
// y entonces si aplicar el schema, aplicando las closures de JS.
// con el abortEarly Joi nos enviará todos los errores en conjunto, no de uno en uno.
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error }= schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
