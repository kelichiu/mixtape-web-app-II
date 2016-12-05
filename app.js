const express = require('express');
const app = express();
const path = require('path')
const superagent = require('superagent');
const bodyParser = require('body-parser');

//Include CSS file
app.use(express.static(path.join(__dirname, 'public')));

app
.use(bodyParser.json())
.post('/',function(req, res){
    res.end();
})
.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})
.listen(8000);



