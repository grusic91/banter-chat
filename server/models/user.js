const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Email is required!',
    min: [4, 'Too short, min is 4 characters'],
    max: [128, 'Too long, max is 128 characters'],
    unique: true
  },
  username: {
    type: String,
    required: 'Username is required!',
    unique: true,
    min:[4, 'Too short, min is 4 characters'],
    max: [23, 'Too long, max is 128 characters']
  },
  password: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [23, 'Too long, max is 128 characters'],
    required: 'Password is required!',
  },
  profileImageUrl: {
    type: String
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  ]
});

/*right before save data to DB, modify password by hashing with bcrypt*/
userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();

  } catch (err) {
    return next(err);
  }
});

/* function to compare password that we'll get from a from or JS request
    whit whatever is saved in the DB*/
userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch; //return true or false if user input correct password
  } catch (err) {
    return next(err);
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
