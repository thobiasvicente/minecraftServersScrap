const mongoose = require('mongoose')
const LivroSchema = new mongoose.Schema({
  author: String,
  nomeLivro: String,
  numeroPaginas: String,
  editora: String,
  isbn: String,
  fileName: String,
  filePath: String,
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

LivroSchema.virtual("url").get(function () {
  const url = process.env.URL || "http://localhost:3333";

  return `${url}/uploads/resizes/${encodeURIComponent(this.filePath)}`;
});

module.exports = mongoose.model('Livros', LivroSchema)
