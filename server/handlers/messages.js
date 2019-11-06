const Message = require("../models/message");
const User = require("../models/user");

exports.createMessage = async function(req, res, next) {
  try {
    // make a new message
    let message = await Message.create({
      text: req.body.text,
      user: req.params.id //grab from url
    });
    let foundUser = await User.findById(req.params.id)
    foundUser.messages.push(message.id)
    await foundUser.save()

    /* find message and populate the user property with username and profileImageUrl
       to get this properties on message about user.
       it allow API to create a message and send back that message immediately with
       the username and the image of the user created (use in future UI)

    */
    let foundMessage = await Message.findById(message._id).populate("user", {
      username: true,
      profileImageUrl: true
    });
    console.log(foundUser);
    // if everything is ok
    return res.status(200).json(foundMessage);
  } catch (err) {
    console.log(err);
    return next(err);
  }
}

exports.getMessage = async function(req, res, next) {
  try {
    let message = await Message.find(req.params.message_id);
    return res.status(200).json(message);
  } catch (err) {
    return next(err)
  }
}

exports.deleteMessage = async function(req, res, next) {
  try {
    let foundMessage = await Message.findById(req.params.message_id);
    await foundMessage.remove()
    return res.status(200).json(foundMessage)
  } catch (err) {
    return next(err)
  }
}
