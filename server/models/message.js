const mongoose = require('mongoose');
const User = require('./user'); // every message need reference for user

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    max: [160, 'Too long, max is 160 characters']
  },
  user: {
    //reference to user
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
{
  timestamps: true
});

// when remove message from messages list remove also users id
messageSchema.pre("remove", async function(next) {
  try {
    //find user
    let user = await User.findById(this.user)
    // remove the id from the message from their messages list
    user.messages.remove(this.id);
    // save the user
    await user.save();
    // return next
    return next();
  } catch (err) {
    return next(err);
  }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
