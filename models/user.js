const mogoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user: { type: String, unique: true, lowercase: true },
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
