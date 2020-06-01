const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = app => {
    app.use(
        '/genre/*',
        createProxyMiddleware({
            target: 'http://search-service:8081',
            changeOrigin: true,
        })
    ),
    app.use(
        '/auditorium/*',
        createProxyMiddleware({
            target: 'http://search-service:8081',
            changeOrigin: true,
        })
    ),
    app.use(
        '/movie/*',
        createProxyMiddleware({
            target: 'http://search-service:8081',
            changeOrigin: true,
        })
    ),
    app.use(
        '/screening/*',
        createProxyMiddleware({
            target: 'http://search-service:8081',
            changeOrigin: true,
        })
    ),
    app.use(
        '/auditorium/*',
        createProxyMiddleware({
            target: 'http://search-service:8081',
            changeOrigin: true,
        })
    ),
    app.use(
        '/booking/*',
        createProxyMiddleware({
            target: 'http://search-service:8081',
            changeOrigin: true,
        })
    ),
    app.use(
        '/book/*',
        createProxyMiddleware({
            target: 'http://booking-service:8082',
            changeOrigin: true,
        })
    ),
    app.use(
        '/auth/*',
        createProxyMiddleware({
            target: 'http://authentication-service:8083',
            changeOrigin: true,
        })
    ),
    app.use(
        '/feedback/*',
        createProxyMiddleware({
            target: 'http://feedback-service:8084',
            changeOrigin: true,
        })
    ),
    app.use(
        '/admin/*',
        createProxyMiddleware({
            target: 'http://admin-service:8085',
            changeOrigin: true,
        })
    )
}