import { io } from "socket.io-client";
import { HOMELAB_URL } from "./env";

export const socket = io(HOMELAB_URL);
