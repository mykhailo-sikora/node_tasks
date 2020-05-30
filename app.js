const express = require('express');

const router = require('./routes'); // шлях до усіх роутів

const app = express();

app.use(express.json());
app.use(express.urlencoded());


app.use(router);


app.listen(3000, () => console.log('server was started on port 3000'));
