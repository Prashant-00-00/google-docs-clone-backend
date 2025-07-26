"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const ws_config_1 = require("./config/ws.config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
(0, ws_config_1.configureWebSocketServer)(server);
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`🚀 Server listening at ${PORT}`);
});
