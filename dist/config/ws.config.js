"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureWebSocketServer = void 0;
const ws_1 = require("ws");
const y_websocket_js_1 = require("../utils/y-websocket.js");
const docs = new Map();
function configureWebSocketServer(server) {
    const wss = new ws_1.WebSocketServer({ server });
    wss.on('connection', (ws, req) => {
        var _a;
        const docName = ((_a = req.url) === null || _a === void 0 ? void 0 : _a.slice(1).split('?')[0]) || 'default';
        const ydoc = (0, y_websocket_js_1.getYDoc)(docName);
        (0, y_websocket_js_1.setupWSConnection)(ws, req, { doc: ydoc });
    });
}
exports.configureWebSocketServer = configureWebSocketServer;
