const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const mongoose = require('mongoose');


app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(session({
    secret: 'testcat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
    cookie: {
        maxAge: 3000 * 60 * 60
    }
}))

app.use(express.static('public'));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/JouJou");
const dbTest = mongoose.connection;
dbTest.on('error', function(){
    console.log("err1");
})

dbTest.once('open', function(){
    console.log('connect')
})

app.use(routes);

// 에러 핸들링 

module.exports = app;