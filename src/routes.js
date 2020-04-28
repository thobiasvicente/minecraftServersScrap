const { Router } = require('express')
const multer = require('multer')
const ServerController = require('./controllers/ServerController')
const uploadConfig = require('./config/upload')
const routes = new Router();

const upload = multer(uploadConfig)

routes.get('/servers', ServerController.index)
module.exports = routes
