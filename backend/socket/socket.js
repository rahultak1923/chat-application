const jwt = require("jsonwebtoken");
const User = require("../models/User");

let onlineUsers = {}; // userId -> socketId

const socketConnection = (io) => {

  io.on("connection", async (socket) => {
    console.log("⚡ New socket connected");

    try {
      // token from frontend
      const token = socket.handshake.auth.token;

      if (!token) return;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      // save active user
      onlineUsers[userId] = socket.id;

      // update DB status
      await User.findByIdAndUpdate(userId, {
        isOnline: true
      });

      console.log("✅ User connected:", userId);

      // send online users list
      io.emit("onlineUsers", Object.keys(onlineUsers));

      // ✅ RECEIVE MESSAGE EVENT
      socket.on("sendMessage", (data) => {
        const { receiverId, message } = data;

        const receiverSocket = onlineUsers[receiverId];

        if (receiverSocket) {
          io.to(receiverSocket).emit("receiveMessage", message);
        }
      });

      // disconnect
      socket.on("disconnect", async () => {
        console.log("❌ User disconnected:", userId);

        delete onlineUsers[userId];

        await User.findByIdAndUpdate(userId, {
          isOnline: false,
          lastSeen: new Date()
        });

        io.emit("onlineUsers", Object.keys(onlineUsers));
      });

    } catch (error) {
      console.log("Socket auth error:", error.message);
    }
  });
};

module.exports = socketConnection;