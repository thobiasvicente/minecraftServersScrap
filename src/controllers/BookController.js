const Book = require('../models/Books')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const upload = require('../config/upload')

module.exports = {
  async index(req, res) {
    const books = await Book.find().sort({ createdAt: -1 })
    return res.json(books)
  },

  async show(req, res) {
    const { id } = req.params
    const book = await Book.findById(id)
    return res.json(book)
  },

  async store(req, res) {
    const book = await Book.create({
      author: req.body.author,
      nomeLivro: req.body.nomeLivro,
      numeroPaginas: req.body.numeroPaginas,
      editora: req.body.editora,
      isbn: req.body.isbn,
      fileName: req.file.originalname,
      filePath: req.file.key
    })
    
    return res.json(book);
  },

  async destroy(req, res) {
    const { id } = req.params
    const book = await Book.findById(id)
    fs.unlink(`./uploads/resizes/${book.filePath}`, function (err) {
      if (err) return res.json({ message: err });
      book.remove()
      return res.json({ message: 'file deleted successfully' });
    });
  }

}

