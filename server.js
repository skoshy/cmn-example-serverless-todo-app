/* eslint-disable @typescript-eslint/no-var-requires */
const http = require("http");
const https = require("https");
const { parse } = require("url");
const { readFileSync } = require("fs");
const next = require("next");

const host = process.env.HOST;
const port = process.env.PORT;

const isDev = process.env.NODE_ENV !== "production";

const app = next({ dev: isDev });
const handle = app.getRequestHandler();

const createServerOptions = [
  (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  },
];

// default to no ssl
let isSsl = false;
let server = http;

if (process.env.SSL_CERT_KEY) {
  // enable ssl
  isSsl = true;
  server = https;

  const httpsOptions = {
    key: readFileSync(process.env.SSL_CERT_KEY),
    cert: readFileSync(process.env.SSL_CERT_KEY),
  };

  createServerOptions.unshift(httpsOptions);
}

app.prepare().then(() => {
  server.createServer(...createServerOptions).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http${isSsl ? "s" : ""}://${host}:${port}`);
  });
});
