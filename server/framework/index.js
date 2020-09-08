const http = require("http");

class Response {
    constructor(responseObject) {
        this.res = responseObject;
    }
    send() {
        if (arguments.length == 1) this._send(200, arguments[0]);
        else this._send(...arguments);
    }
    _send(statusCode, content) {
        let head = { "Content-Type": "text/html" },
            reply = content;
        if (typeof content == "object") {
            head = { "Content-Type": "application/json" };
            reply = JSON.stringify(content);
        }
        this.res.writeHead(statusCode, head);
        this.res.write(reply);
        this.res.end();
    }
}
class Spress {
    constructor() {
        this.routerToHandler = [];
    }
    _setPathHandler(method, path, handler) {
        this.routerToHandler.push({
            type: "path",
            path,
            method,
            handler,
        });
    }
    use(handler) {
        this.routerToHandler.push({
            type: "middleware",
            path: "",
            method: "",
            handler,
        });
    }
    get(path, handler) {
        this._setPathHandler("GET", path, handler);
    }
    post(path, handler) {
        this._setPathHandler("POST", path, handler);
    }
    put(path, handler) {
        this._setPathHandler("PUT", path, handler);
    }
    patch(path, handler) {
        this._setPathHandler("PATCH", path, handler);
    }
    delete(path, handler) {
        this._setPathHandler("DELETE", path, handler);
    }

    _handler(http_req, http_res) {
        let shouldGoNext = false,
            handled = false;
        let res = new Response(http_res);
        const next = () => (shouldGoNext = true);
        for (const element of this.routerToHandler) {
            const splittedHandlerPath = element.path.split("/");
            const splittedRequestPath = http_req.url.split("/");
            if (element.type == "middleware") {
                shouldGoNext = false;
                element.handler(http_req, res, next);
                if (!shouldGoNext) {
                    handled = true;
                    break;
                }
            } else {
                const handlerPathLen = splittedHandlerPath.length;
                let correctRoute =
                    handlerPathLen == splittedRequestPath.length &&
                    element.method == http_req.method;
                if (!correctRoute) continue;
                const params = {};
                for (let i = 0; i < handlerPathLen; i++) {
                    if (splittedHandlerPath[i][0] === ":")
                        params[splittedHandlerPath[i].substr(1)] =
                            splittedRequestPath[i];
                    else if (
                        splittedHandlerPath[i] !== splittedRequestPath[i]
                    ) {
                        correctRoute = false;
                        break;
                    }
                }
                if (correctRoute) {
                    console.log(params);
                    http_req.params = params;
                    shouldGoNext = false;
                    element.handler(http_req, res, next);
                    handled = true;
                    if (!shouldGoNext) {
                        break;
                    }
                }
            }
        }
        if (!handled) res._send(404, "404 Not found");
    }
    listen(port, callback) {
        this.server = http.createServer((req, res) => this._handler(req, res));
        this.server.listen(port, callback);
    }
}
const createSpress = () => new Spress();
module.exports = createSpress;
