const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); 
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000; 
const cors = require("cors");

server.use(middlewares);
server.use(router);
server.use(cors())

server.listen(port);