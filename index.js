const API_NAME = 'GET DATA';
const express = require('express');
const helmet = require('helmet');
const app = express();
const Retrieve = require('./api/_get');
const path = require('path')

app.use(helmet());

app.use('/',express.static(path.join(__dirname,'api')))

console.log(`|>-> INIT API: ${ API_NAME }`);

app.get('*', (req, res) => {
    console.log(`|> ${ API_NAME } received request from ${ req.hostname }`);
    console.log('\n REQUEST HEADERS: ', req.headers, '\n');
    console.log('\n REQUEST METHOD: ',req.method,'\n');
    console.log('\n REQUEST PATH: ', req.path, '\n');
    console.log('\n REQUEST QUERY: ', req.query, '\n');
    Retrieve(req.query,res);
    //res.status(200).send('yes');
    //res.send();  
})
module.exports = app;