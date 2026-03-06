const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 3000 });

server.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("message", (message) => {

    const data = JSON.parse(message.toString());

    const username = data.username;
    const text = data.message;

    const finalMessage = username + ": " + text;

    console.log(finalMessage);

    // broadcast
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(finalMessage);
      }
    });

  });

  socket.on("close", () => {
    console.log("User disconnected");
  });

});

console.log("WebSocket Server running on ws://localhost:3000");