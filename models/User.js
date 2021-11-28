let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email:String,
  age:Number
})
module.exports = mongoose.model('User', userSchema)