"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWSConnection = exports.getYDoc = void 0;
const Y = __importStar(require("yjs"));
const awareness_js_1 = require("y-protocols/awareness.js");
const encoding = __importStar(require("lib0/encoding.js"));
const decoding = __importStar(require("lib0/decoding.js"));
const map = __importStar(require("lib0/map.js"));
const syncProtocol = __importStar(require("y-protocols/sync.js"));
const messageSync = 0;
const messageAwareness = 1;
const docs = new Map();
function getYDoc(docName) {
    if (!docs.has(docName)) {
        const ydoc = new Y.Doc();
        docs.set(docName, ydoc);
    }
    return docs.get(docName);
}
exports.getYDoc = getYDoc;
function setupWSConnection(ws, req, { doc }) {
    const awareness = new Map();
    let isAlive = true;
    ws.binaryType = 'arraybuffer';
    // Send initial sync step 1
    const encoder = encoding.createEncoder();
    encoding.writeVarUint(encoder, messageSync);
    syncProtocol.writeSyncStep1(encoder, doc);
    ws.send(encoding.toUint8Array(encoder));
    ws.on('message', (data) => {
        const message = new Uint8Array(data);
        const decoder = decoding.createDecoder(message);
        const encoder = encoding.createEncoder();
        const messageType = decoding.readVarUint(decoder);
        if (messageType === messageSync) {
            const syncMessageType = syncProtocol.readSyncMessage(decoder, encoder, doc, ws);
            if (encoding.length(encoder) > 1) {
                ws.send(encoding.toUint8Array(encoder));
            }
        }
        else if (messageType === messageAwareness) {
            const update = decoding.readVarUint8Array(decoder);
            (0, awareness_js_1.applyAwarenessUpdate)(awareness, update, ws);
        }
    });
    ws.on('pong', () => {
        isAlive = true;
    });
    ws.on('close', () => {
        for (const [key, value] of docs.entries()) {
            if (value === doc) {
                docs.delete(key);
                break;
            }
        }
    });
}
exports.setupWSConnection = setupWSConnection;
