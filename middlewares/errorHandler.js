// Creamos función que nos hará llegar a un middleware de tipo error:
function logErrors(err, req, res, next) {
  //mostramos el error en servidor para poder monitorearlo
  console.error(err);

  next(err); // importante para saber que se esta enviando a un middleware de tipo error, si no tiene el (error) dentro,
  // entonces se entiende que se esta mandando a un middleware de tipo normal.
}

// Crear formato para devolverlo al cliente que se complementa con la función anterior:
// así no se utilice NEXT en el código se debe poner aqui, ya que un middleware de error tiene los cuatro parámetros.
function errorHandler(err, req, res, next) {
  //indicar que el error es estatus 500 Internal Server Error
  res.status(500).json({
    //mostrar al cliente el mensaje de error
    message: err.message,

    //mostrar info del error
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
