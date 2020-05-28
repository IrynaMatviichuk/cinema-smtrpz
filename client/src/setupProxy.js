const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = app => {
    app.use(
        '/genre/*',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            changeOrigin: true,
        })
    ),
    app.use(
        '/auditorium/*',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            changeOrigin: true,
        })
    ),
    app.use(
        '/movie/*',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            changeOrigin: true,
        })
    ),
    app.use(
        '/screening/*',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            changeOrigin: true,
        })
    ),
    app.use(
        '/auditorium/*',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            changeOrigin: true,
        })
    ),
    app.use(
        '/booking/*',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            changeOrigin: true,
        })
    ),
    app.use(
        '/book/*',
        createProxyMiddleware({
            target: 'http://localhost:8082',
            changeOrigin: true,
        })
    ),
    app.use(
        '/auth/*',
        createProxyMiddleware({
            target: 'http://localhost:8083',
            changeOrigin: true,
        })
    ),
    app.use(
        '/feedback/*',
        createProxyMiddleware({
            target: 'http://localhost:8084',
            changeOrigin: true,
        })
    ),
    app.use(
        '/admin/*',
        createProxyMiddleware({
            target: 'http://localhost:8085',
            changeOrigin: true,
        })
    )
}