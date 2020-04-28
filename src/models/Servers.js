const mongoose = require('mongoose')
const ServersSchema = new mongoose.Schema({
  name: String,
  ip: String,
}, {
  timestamps: true,
})

module.exports = mongoose.model('Servers', ServersSchema)
