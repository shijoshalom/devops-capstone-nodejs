const http = require('node:http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            status: 'healthy',
            application: 'devops-capstone-nodejs'
        }));
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>DevOps Capstone</title>
        </head>
        <body>
            <h1>DevOps Capstone Application</h1>
            <p>Node.js application deployed through a CI/CD pipeline.</p>
            <p>Health endpoint: <a href="/health">/health</a></p>
        </body>
        </html>
    `);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Application listening on port ${PORT}`);
});