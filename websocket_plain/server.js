const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 3000 });

let users = [];

server.on("connection", (socket) => {

  socket.on("message", (message) => {

    const data = JSON.parse(message.toString());

    // USER JOIN
    if (data.type === "join") {

      socket.username = data.username;

      users.push(socket.username);

      broadcastMessage(socket.username + " joined the chat");

      sendUserList();

    }

    // CHAT MESSAGE
    if (data.type === "message") {

      broadcastMessage(socket.username + ": " + data.message);

    }

  });

  socket.on("close", () => {

    if (socket.username) {

      users = users.filter(user => user !== socket.username);

      broadcastMessage(socket.username + " left the chat");

      sendUserList();

    }

  });

});

// SEND MESSAGE TO ALL
function broadcastMessage(msg) {

  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: "chat",
        message: msg
      }));
    }
  });

}

// SEND USER LIST
function sendUserList() {

  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: "users",
        users: users
      }));
    }
  });

}

console.log("WebSocket Server running on ws://localhost:3000");