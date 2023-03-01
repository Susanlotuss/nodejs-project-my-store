const express = require('express');
const routerApi = require('./routes')

//Llamar express
const app = express();

// Indicar en qué puerto
const port = 3000;

// Agregamos el middleware nativo de express
app.use(express.json());


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


routerApi(app);

// App escuchará un puerto en especifico

app.listen(port, () => {
  console.log('My port ' + port);
});
