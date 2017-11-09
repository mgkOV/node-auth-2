const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  password: String
});

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.hash(user.password, 10).then(hash => {
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
