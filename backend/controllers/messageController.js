const Message = require("../models/Message");
const { io, onlineUsers } = require("../server");

// SEND MESSAGE
exports.sendMessage = async (req, res) => {
  const { receiver, text } = req.body;

  const message = await Message.create({
    sender: req.user.id,
    receiver,
    text,
  });

  const receiverSocket = onlineUsers.get(receiver);

  if (receiverSocket) {
    io.to(receiverSocket).emit("receiveMessage", message);
  }

  res.status(201).json(message);
};

// GET MESSAGES
exports.getMessages = async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.user.id, receiver: req.params.userId },
      { sender: req.params.userId, receiver: req.user.id },
    ],
  }).sort({ createdAt: 1 });

  res.json(messages);
};