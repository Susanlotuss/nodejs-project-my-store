const express = require('express');

//Llamar express
const app = express();

// Indicar en qué puerto
const port = 3000;


// Definir ruta (esta es la ruta por defecto)
app.get('/', (req, res) => {

  // Respuesta a enviar al cliente
  res.send('Hola mi server en Express');
});


// App escuchará un puerto en especifico

app.listen(port, () => {
  console.log('Mi port' + port);
});
