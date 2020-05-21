const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = app => {
    app.use(
        '/screening/*',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            changeOrigin: true,
        })
    ),
    app.use(
        '/auth/*',
        createProxyMiddleware({
            target: 'http://localhost:8083',
            changeOrigin: true,
        })
    )
}