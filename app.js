require('dotenv').config();
const express = require('express');
const expressFileUpload = require('express-fileupload');
const path = require('path');
const morgan = require('morgan');
const {dataBaseEnum: {PORT}} = require('./constants/');
const db = require('./dataBase').getInstance();
db.setModels();

const router = require('./routes');
const app = express();

app.use(morgan('dev'));
app.use(expressFileUpload({}));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(router);

app.listen(PORT, () => console.log(`server was started on port: ${PORT}`));
