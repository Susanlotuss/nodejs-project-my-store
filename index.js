const express = require('express');
const cors = require('cors');
const routerApi = require('./routes')

// Importar middleware
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');

//Llamar express
const app = express();

// Indicar en qué puerto
const port = 3000;

// Agregamos el middleware nativo de express
app.use(express.json());

// Agregamos el middleware CORS. Con esta config aceptaremos a CUALQUIER origen. (para APIs públicas por ejemplo.)
// app.use(cors());

// Aquí agregaremos el middleware pero solo aceotando los origenes de los cuales SI quiero recibir peticiones,
// para que NO cualquiera pueda acceder, solo los indicados (pueden ser rutas, dominios, etc).
// Si ingresamos a nuestro http://localhost:5500/frontend.html veremos la conexión a nuestra Api, pero si por ejemplo ingresamos al live server (puerto http://127.0.0.1:5500/frontend.html), saltará el error de CORS.
const whitelist = ['http://localhost:5500'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(options));


// Definir ruta (esta es la ruta por defecto)
app.get('/', (req, res) => {

  // Respuesta a enviar al cliente
  res.send('Hola mi server en Express');
});

// Definir nueva ruta
app.get('/nueva-ruta', (req, res) => {

  // Respuesta a enviar al cliente
  res.send('Hola soy una nueva ruta en express');
});

// Definición del routing
routerApi(app);


// Los middlewares de tipo error SIEMPRE deben ir después de definir el routing.
  // Utilizamos los middleware.
    // Es importante el orden en que se coloquen porque es el orden en que se ejecutarán. En este caso el logErrors es el único con un next, por lo tanto,
      // si se colocara el errorHandler antes, ahí terminaría el proceso.
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// App escuchará un puerto en especifico
app.listen(port, () => {
  console.log('My port ' + port);
});
