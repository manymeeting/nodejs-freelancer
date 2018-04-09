var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var receiverUser = require('./receivers/receiver_user');
var kafkaBackendService = require('./kafka/KafkaBackendService');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// initlize consumers
var userConsumer = kafkaBackendService.getConsumer(receiverUser.getTopicName()); 
receiverUser.init(userConsumer);

module.exports = app;
