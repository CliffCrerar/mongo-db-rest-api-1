const API_NAME = 'GET DATA';
const express = require('express');
const helmet = require('helmet');
const app = express();
const Retrieve = require('./api/_get');
const Insert = require('./api/_put');
const path = require('path');
const parseLog = require('mongodb-log').parse;
const os = require('os');
const bodyParser = require('body-parser');

// Compatibility with posix and windows.
process.env.NODE_PATH=[__dirname,path.join(__dirname,'api')].join(os.platform!='win32'? ':':";");

let line = 'Wed Mar 12 14:42:31 [initandlisten] db version v2.5.6-pre-';
console.log("MDB-LOG",parseLog(line));

app.use(helmet());

app.use('/',express.static(path.join(__dirname,'api')))

function reqLogConsole(req){
    console.log(`|> ${ API_NAME } received request from ${ req.hostname }`);
    console.log('\n REQUEST HEADERS: ', req.headers, '\n');
    console.log('\n REQUEST METHOD: ',req.method,'\n');
    console.log('\n REQUEST PATH: ', req.path, '\n');
    console.log('\n REQUEST QUERY: ', req.query, '\n');
    // console.log('\n REQUEST BODY: ', req.body, '\n');
    
    return;
}

console.log(`|>-> INIT API: ${ API_NAME }`);

app.get('*', (req, res) => {
    // reqLogConsole(req);
    Retrieve(req.query,res);
})

app.put('*', bodyParser.json(), (req, res) => {
    reqLogConsole(req);
    Insert(req.query, res, req.body);
});

module.exports = app;