//arquvo de variaveis .env
require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

//debug do express morgan
app.use(morgan('dev'));
//cors para acesso externo
app.use(cors());
//converte em json
app.use(express.json());
//permite envio de arquivos pro server
app.use(express.urlencoded({ extended: true }));

//extraindo as variaveis que precisamos
const { MONGO_URL, PORT } = process.env;

//conecta ao mongo

mongoose.connect(MONGO_URL).then(
  () => {
    console.log('Conectado ao db com sucesso');

    app.use('/bolos', require('./routes/BoloRouter'));
    app.use('/usuarios', require('./routes/UsuarioRouter'));
    app.use('/depoimentos', require('./routes/DepoRouter'));
    app.use('/avataruser', require('./routes/AvatarRouter'));

    app.listen(PORT);
  },
  err => {
    console.log('nao foi possivel conectar a data base ' + err);
  },
);
