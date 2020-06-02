const express = require('express');

const db = require('./dataBase').getInstance();
db.setModels();

const router = require('./routes'); // шлях до усіх роутів

const app = express();

app.use(express.json());
app.use(express.urlencoded());


app.use(router);

app.use('*', (error, req, res, next) => {
    res
        .status(error.status || 400)
        .json({
            message: error.message,
            code: error.custumCode
        })
});


app.listen(3000, () => console.log('server was started on port 3000'));
