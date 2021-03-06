const http = require('http');
const fileStore = require('./fileStore');
const parseUrl = require('url').parse;
const qs = require('querystring');
const handlers = require('../handlers');

const server = http.createServer((req, res) => {
  console.log('Connection detected!');
  let method = req.method;
  let url = parseUrl(req.url);
  let queryStr = (url.query);
  let query = qs.parse(queryStr);
  let pathName = url.pathname;
  let paths = pathName.split('/');

  if (pathName === '/teams' && method === 'POST') {
    handlers.post(req, res);
  } else if (pathName === '/teams' && method === 'GET') {
    handlers.getAll(req, res);
  } else if (paths[1] !== 'teams') {
    handlers.notFound(res);
  } else if (method === 'GET') {
    handlers.getSingle(req, res, paths[2]);
  } else if (method === 'PUT') {
    handlers.put(req, res, paths[2]);
  } else if (method === 'DELETE') {
    handlers.destroy(req, res, paths[2]);
  } 
  
});

module.exports = server;

