const { Router } = require('express')
const multer = require('multer')
const BookController = require('./controllers/BookController')
const uploadConfig = require('./config/upload')
const routes = new Router();

const upload = multer(uploadConfig)

routes.post('/books', upload.single('image'), BookController.store)
routes.get('/books', BookController.index)
routes.delete('/book/:id', BookController.destroy)
routes.get('/book/:id', BookController.show)
module.exports = routes
