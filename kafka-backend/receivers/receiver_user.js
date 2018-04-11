var TOPIC_NAME = "mytest";
var _consumer = null; 
var kafkaBackendService = require('../kafka/KafkaBackendService');
var serviceProxy = require('../utils/ServiceProxy');
var _initConsumer = function()
{
	var consumer = kafkaBackendService.getConsumer(TOPIC_NAME);

	consumer.on('message', function (message) {
	    console.log("Receiver User[MSG]: " + message.value);
	    var content = _parseMessage(message);
	    switch(content.method)
	    {
	    	case "get": 
	    		console.log(content);
	    		serviceProxy.get(content.serviceAPI, content.params, function(result){
	    			kafkaBackendService.sendMessage(content.topicRes, {data: result, reqID: content.reqID}, 0);
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