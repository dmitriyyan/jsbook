"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const cells_1 = __importDefault(require("./routes/cells"));
const serve = (port, filename, dir) => {
    const app = (0, express_1.default)();
    if (process.env.NODE_ENV === 'development') {
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: 'http://localhost:3000',
            ws: true,
            logLevel: 'silent',
        }));
    }
    else {
        const packagePath = require.resolve('local-client/dist/index.html');
        app.use(express_1.default.static(path_1.default.dirname(packagePath)));
    }
    app.use((0, cells_1.default)(filename, dir));
    app
        .listen(port, () => {
        console.log(`${filename} is served on http://localhost:${port}`);
    })
        .on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${port} is in use. Try running on a different port.`);
        }
        else {
            console.error(err.message);
        }
    });
};
exports.default = serve;
