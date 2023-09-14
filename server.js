const express = require('express');
const https = require('https');
const fs = require('fs');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpPort = 3000;
const httpsPort = 3000; // Port for HTTPS

app.prepare().then(() => {
  const server = express();

  // Define the paths you want to handle with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Read the SSL certificate and key files
  const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/vjgr.com.vn/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/vjgr.com.vn/fullchain.pem'),
  };

  // Create an HTTPS server
  https.createServer(httpsOptions, server).listen(httpsPort, (err) => {
    if (err) throw err;
    console.log(`HTTPS server is running on port ${httpsPort}`);
  });

  // Create an HTTP server for redirection to HTTPS
  server.listen(httpPort, (err) => {
    if (err) throw err;
    console.log(`HTTP server is running on port ${httpPort}`);
  });
});
