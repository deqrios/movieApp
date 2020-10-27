const { createProxyMiddleware } = require("http-proxy-middleware");

// => 클라이언트에서 보내는 요청이 CORS정책에 위배되지않게 올바르게 서버로 요청을 보내게 해주는 proxy.
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true,
        })
    );
};
