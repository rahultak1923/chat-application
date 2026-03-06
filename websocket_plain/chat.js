const WebSocket = require("ws");

// Create WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");

let allUsers = [];


// When a client connects
wss.on("connection", (ws) => {
    console.log("New client connected");

    // Add to all users list
    allUsers.push(ws);

    // Send message to client
    ws.send("Welcome to WebSocket Server!");

    // Listen for messages from client
    ws.on("message", (message) => {
        console.log("Received:", message.toString());

        // Echo message back
        allUsers.forEach((user) => {
            if (user !== ws) {
                user.send(`${message}`);
            }
        });
    });

    // Handle disconnect
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});