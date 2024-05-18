import { WebSocket } from "ws";

const webSocketClient = new WebSocket("ws://localhost:8080");

webSocketClient.on("open", () => {
  webSocketClient.send("Hello from client!");

  webSocketClient.on("message", (message) => {
    console.log(`Received message: ${message}`);
    webSocketClient.close();
  });
});
