require("express-async-errors");

const AppError = require('./utils/AppError');
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

app.use(( error, request, response, next ) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))