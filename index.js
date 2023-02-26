const API_NAME = 'MongoDB Rest API';
const express = require('express');
const helmet = require('helmet');
const app = express();
const Retrieve = require('./api/_get');
const Insert = require('./api/_put');
const path = require('path');
const parseLog = require('mongodb-log').parse;
const os = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');
let deleteOneRow = require('./api/_delete');
let upsertOneRow = require('./api/_post');
let morgan = require('morgan');

// Compatibility with posix and windows.
process.env.NODE_PATH = [__dirname, path.join(__dirname, 'api')].join(os.platform != 'win32' ? ':' : ";");

let line = new Date().toUTCString + ' [initandlisten] db version v2.5.6-pre-';
console.log("MDB-LOG", parseLog(line));

app.use(helmet());
app.use(cors());
app.use(morgan(`
    LOG > :date \n 
    REMOTE: > :remote-addr  
    USER > :remote-user  
    REQ HEADER > :req[header]  
    METHOD > :method 
    URL > :url 
    STATUS > :status 
    RES HEADER > :res[header] 
    RES LEN > :res[content-length] 
    RES TIME > :response-time ms
    AGENT > :user-agent`
));
app.use('/', express.static(path.join(__dirname, 'api')))

function reqLogConsole(req) {
    console.log(`|> ${API_NAME} received request from ${req.hostname}`);
    console.log('\n REQUEST HEADERS: ', req.headers, '\n');
    console.log('\n REQUEST METHOD: ', req.method, '\n');
    console.log('\n REQUEST PATH: ', req.path, '\n');
    console.log('\n REQUEST QUERY: ', req.query, '\n');
    // console.log('\n REQUEST BODY: ', req.body, '\n');
    return;
}

console.log(`|>-> INIT API: ${API_NAME}`);

// app.get( '/databasinfo', ( req, res ) => {
//     reqLogConsole( req );
//     Retrieve( req.query, res );
// } )

app.all('*', (req, res, next) => {
    reqLogConsole(req);
    next();
})

app.get('*', (req, res) => {
    Retrieve(req.query, res);
})

app.put('*', bodyParser.json(), (req, res) => {
    Insert(req.query, res, req.body);
});

app.post('*', bodyParser.json(), (req, res) => {
    upsertOneRow(req.query, res, req.body);
});

app.delete('*', bodyParser.json(), (req, res) => { deleteOneRow(req.query, res, req.body); });

module.exports = app;