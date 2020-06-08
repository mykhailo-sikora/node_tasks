const express = require('express');
require('dotenv').config();

const db = require('./dataBase').getInstance();
db.setModels();

const router = require('./routes'); // шлях до усіх роутів

const app = express();

app.use(express.json());
app.use(express.urlencoded());


app.use(router);

app.use('*', (error, req, res, next) => {
    let message = error.message;

    if (error.parent) {
        message = error.parent.sqlMessage
    }
    res
        .status(error.status || 400)
        .json({
            message,
            code: error.custumCode
        })
});


app.listen(process.env.PORT || 3000, () => console.log(`server was started on port: ${process.env.PORT || 3000}`));
