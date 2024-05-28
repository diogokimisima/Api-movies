const express = require('express');

const routes = require("./router") 

const app = express();
app.use(express.json());

app.use(routes);

// //rota Obrigatoria a ser colocado
// app.get('/message/:id/:user', (request, response) => {
//     const { id, user } = request.params;

//     response.send(`Id da mensagem: ${id} para o usuario ${user}`)
// })

// //rota Opcional a ser colocado 
// app.get('/users', (request, response) => {
//     const { page, limit } = request.query;

//     response.send(`Pagina ${page}, limit ${limit}`);
// })



const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))