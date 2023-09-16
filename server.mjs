import express from 'express';
import https from 'https';
import fs from 'fs';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpPort = 3001;
const httpsPort = 443; // Port for HTTPS

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

  https.createServer(httpsOptions, server).listen(httpsPort, () => {
    console.log(`HTTPS server is running on port ${httpsPort}`);
  }).on('error', (err) => {
    if (err) throw err;
  });

  server.listen(httpPort, () => {
    console.log(`HTTP server is running on port ${httpPort}`);
  }).on('error', (err) => {
    if (err) throw err;
  });

});
p