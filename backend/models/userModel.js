// imports. bcrypt for hashing the passwords.
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// user schema for database. requires a username, email and password to be entered
// also posts timestamps for when posts are created via mongoose.
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 4
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: false
    },

    bio: {
      type: String,
      required: false,
    },

    image : {
      type: String,
      required: false,
    }
  },

    {
      timestamps: true
    }
  );

  userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
      next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
  });

  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  const User = mongoose.model('User', userSchema);

  module.exports = User;