"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSocketResponse = void 0;
const createSocketResponse = (client, event, data, message) => {
    client.emit(event, JSON.stringify({
        event,
        data,
        message: message || '요청이 성공적으로 처리되었습니다.',
    }));
};
exports.createSocketResponse = createSocketResponse;
//# sourceMappingURL=socket.response.js.map