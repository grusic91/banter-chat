const db = require('../models');

exports.createMessage = async function(req, res, next) {
  try {
    // make a new message
    let message = await db.Message.create({
      text: req.body.text,
      user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.messages.push(message.id); // push message id to user's messages list
    // every user that creates a message need to have id of this message
    await foundUser.save();

    /* find message and populate the user property with username and profileImageUrl
       to get properties on message about user.
       it allow API to create a message and send back that message immediately with
       the username and the image of the user created (use in future UI);
    */
    let foundMessage = await db.Message.findById(message._id).populate("user", {
      username: true,
      profileImageUrl: true
    });

    // if everything is ok with foundMessage
    return res.status(200).json(foundMessage);
  } catch (err) {
    console.log(err);
    return next(err);
  }
}

exports.getMessage = async function(req, res, next) {
  /* get individual message*/
  try {
    let message = await db.Message.find(req.params.message_id);
    return res.status(200).json(message);
  } catch (err) {
    return next(err)
  }
}

exports.deleteMessage = async function(req, res, next) {
  try {
    let foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove()
    return res.status(200).json(foundMessage)
  } catch (err) {
    return next(err)
  }
}
