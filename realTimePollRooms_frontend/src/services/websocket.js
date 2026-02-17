import { Client } from "@stomp/stompjs";

const WS_URL = import.meta.env.VITE_WS_URL || "http://localhost:8080/ws";

export const connectWebSocket = (pollId, onMsgReceived) => {

  // ✅ Load SockJS dynamically to avoid Vite import issues
  const SockJS = window.SockJS;

  const client = new Client({
    webSocketFactory: () => new SockJS(WS_URL),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    onConnect: () => {
      console.log("WebSocket Connected ✅");
      client.subscribe(`/topic/poll/${pollId}`, (msg) => {
        const updatedPoll = JSON.parse(msg.body);
        onMsgReceived(updatedPoll);
      });
    },

    onStompError: (frame) => {
      console.error("STOMP ERROR: ", frame);
    },

    onWebSocketError: (err) => {
      console.error("WebSocket error: ", err);
    },

    onDisconnect: () => {
      console.log("WebSocket Disconnected");
    },
  });

  client.activate();
  return client;
};