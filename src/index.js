require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const path = require('path')
const cors = require('cors')

const server = require('http').Server(app)
const io = require('socket.io')(server);

mongoose.connect(process.env.MONGO_CONN_STRING, { useNewUrlParser: true })

app.use((req, res, next) => {
  req.io = io;
  next();
})

app.use(cors())
app.use(express.json());
app.use(require('./routes'))

server.listen(3333, () => {
  console.log('Server Running')
})
