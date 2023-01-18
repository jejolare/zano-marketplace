const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/json_rpc"],
    createProxyMiddleware({
      target: "http://127.0.0.1:11211",
    })
  );
  app.use(
    ["/api"],
    createProxyMiddleware({
      target: "http://127.0.0.1:3019",
    })
  );
};
