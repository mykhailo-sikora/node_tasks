require('dotenv').config();
const {dataBaseEnums: {PORT}} = require('./constants/');

const express = require('express');
const morgan = require('morgan');

const db = require('./dataBase').getInstance();
db.setModels();

const router = require('./routes'); // шлях до усіх роутів

const app = express();

app.use(morgan('dev')); // debug
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


app.listen(PORT, () => console.log(`server was started on port: ${PORT}`));
