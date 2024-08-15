import { Server } from "ws";

let wsServer;

export async function GET(req) {
  if (!wsServer) {
    console.log("Initializing WebSocket server...");
    const { socket } = req;
    wsServer = new Server({ noServer: true });

    socket.server.on("upgrade", (request, socket, head) => {
      if (request.url === "/api/signaling") {
        wsServer.handleUpgrade(request, socket, head, (ws) => {
          wsServer.emit("connection", ws, request);
        });
      }
    });

    wsServer.on("connection", (ws) => {
      ws.on("message", (message) => {
        wsServer.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      });
    });
  } else {
    console.log("WebSocket server already initialized.");
  }

  return new Response(null, { status: 200 });
}
