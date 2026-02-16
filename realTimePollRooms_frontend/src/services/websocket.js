import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WS_URL = import.meta.env.VITE_WS_URL || "http://localhost:8080/ws";

export const connectWebSocket = (pollId, onMsgReceived) => {
  const client = new Client({
    webSocketFactory: () => SockJS(WS_URL),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    onConnect: () => {
      console.log("Websocket Connected");
      client.subscribe("/topic/poll/${pollId}", (msg) => {
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
  });
  client.activate();
  return client;
};
