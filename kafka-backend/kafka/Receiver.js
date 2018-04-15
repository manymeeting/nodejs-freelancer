var kafkaBackendService = require('../kafka/KafkaBackendService');
var serviceProxy = require('../utils/ServiceProxy');


var _initConsumer = function(topicName)
{
	
	// currently only support fetching from the latest offsets
	var offset = kafkaBackendService.getOffset();
	var partition = 0;
	offset.fetch([{ topic: topicName, partition: partition, time: -1 }], function (err, data) {
		if(err)
		{
			throw err;
		}
		var latestOffset = data[topicName]['0'][0];
		console.log(topicName + " latestOffset: " + latestOffset);

		var consumer = kafkaBackendService.getConsumer(topicName, partition, latestOffset);
		consumer.on('message', function (message) {
		    console.log("Receiver [MSG]: ");
		    console.log(message);
		    var content = _parseMessage(message);
		    switch(content.method)
		    {
		    	case "get": 
		    		serviceProxy.get(content.apiURL, function(result){
		    			kafkaBackendService.sendMessage(content.topicRes, 0, {data: result, reqID: content.reqID});
		    		});
		    		break;
		    	case "post":
		    		serviceProxy.post(content.apiURL, content.params, function(result){
		    			kafkaBackendService.sendMessage(content.topicRes, 0, {data: result, reqID: content.reqID});
		    		});
		    		break;
		    	case "put":
		    		serviceProxy.put(content.apiURL, content.params, function(result){
		    			kafkaBackendService.sendMessage(content.topicRes, 0, {data: result, reqID: content.reqID});
		    		});
		    		break;
		    	case "delete":
		    		serviceProxy.delete(content.apiURL, content.params, function(result){
		    			kafkaBackendService.sendMessage(content.topicRes, 0, {data: result, reqID: content.reqID});
		    		});
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

module.exports.init = function(topicName)
{
	_initConsumer(topicName);
}
