var TOPIC_NAME = "mytest";
var _consumer = null; 
var kafkaBackendService = require('../kafka/KafkaBackendService');
var serviceProxy = require('../utils/ServiceProxy');
var _initConsumer = function()
{
	var consumer = kafkaBackendService.getConsumer(TOPIC_NAME);

	consumer.on('message', function (message) {
	    console.log("Receiver User[MSG]: " + message.value);
	    var _message = _parseMessage(message);
	    switch(_message.method)
	    {
	    	case "get": 
	    		console.log(_message);
	    		serviceProxy.get(_message.serviceAPI, _message.params, function(){

	    		});
	    		break;
	    	case "post":
	    		serviceProxy.post();
	    		break;
	    	case "put":
	    		serviceProxy.put();
	    		break;
	    	case "delete":
	    		serviceProxy.delete();
	    		break;
	    	default:
	    		serviceProxy.get(_message.serviceAPI, _message.params, function(){

	    		});
	    		break;
	    }

	});

	consumer.on('error', function (err) {
	    console.log('Receiver User[Error]:',err);
	});

	consumer.on('offsetOutOfRange', function (err) {
	    console.log('Receiver User[OffsetOutOfRange]:',err);
	});

	_consumer = consumer;
}

/**
 * Parses a kafka message and returns a structured data.
 * @param {message} message to be parsed.
 * @return {object} The parsed result.
 */
var _parseMessage = function(message)
{
	var _message = JSON.parse(message.value);
	return _message;

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