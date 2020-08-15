"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@adamgen/logger");
const kill_port_1 = __importDefault(require("kill-port"));
function forceListen(app) {
    const port = parseInt(process.env.PORT) || 3000;
    const server = app.listen(port);
    server.addListener('error', function listenErrorCallback(err) {
        logger_1.logger.green('killed port', port);
        if (err.code === 'EADDRINUSE') {
            kill_port_1.default(port)
                .then(() => {
                server.listen(port);
            })
                .catch((killPortErr) => {
                console.log(killPortErr);
            });
        }
    });
    server.addListener('listening', function listeningCallback() {
        logger_1.logger.green('server code runs on port', port);
        logger_1.logger.message('RESTART_SUCCESS');
    });
}
exports.forceListen = forceListen;
//# sourceMappingURL=force-listen.js.map