var TOPIC_NAME = "queuing.users";
var _consumer = null; 
var kafkaBackendService = require('../kafka/KafkaBackendService');
var serviceProxy = require('../utils/ServiceProxy');


var _initConsumer = function()
{
	
	// currently only support fetching from the latest offsets
	var offset = kafkaBackendService.getOffset();
	var partition = 0;
	offset.fetch([{ topic: TOPIC_NAME, partition: partition, time: -1 }], function (err, data) {
		if(err)
		{
			throw err;
		}
		var latestOffset = data[TOPIC_NAME]['0'][0];
		console.log("latestOffset: " + latestOffset);

		var consumer = kafkaBackendService.getConsumer(TOPIC_NAME, partition, latestOffset);
		consumer.on('message', function (message) {
		    console.log("Receiver [MSG]: ");
		    console.log(message);
		    var content = _parseMessage(message);
		    switch(content.method)
		    {
		    	case "get": 
		    		console.log(content);
		    		serviceProxy.get(content.apiURL, function(result){
		    			kafkaBackendService.sendMessage(content.topicRes, 0, {data: result, reqID: content.reqID});
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
		    console.log('Receiver [Error]:',err);
		});

		consumer.on('offsetOutOfRange', function (err) {
		    console.log('Receiver [OffsetOutOfRange]:',err);
		});

		_consumer = consumer;

	});


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