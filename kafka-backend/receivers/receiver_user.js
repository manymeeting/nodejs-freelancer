var TOPIC_NAME = "mytest";
var _consumer = null; 
var kafkaBackendService = require('../kafka/KafkaBackendService');

var _initConsumer = function()
{
	var consumer = kafkaBackendService.getConsumer(TOPIC_NAME);

	consumer.on('message', function (message) {
	    console.log("Receiver User[Received]: " + message);
	});

	consumer.on('error', function (err) {
	    console.log('Receiver User[Error]:',err);
	});

	consumer.on('offsetOutOfRange', function (err) {
	    console.log('Receiver User[OffsetOutOfRange]:',err);
	});

	_consumer = consumer;
}


module.exports.init = function()
{
	_initConsumer();
}



module.exports.getConsumer = function()
{
	if(_consumer)
	{
		return _consumer;
	}

	_initConsumer();
	return _consumer;
}