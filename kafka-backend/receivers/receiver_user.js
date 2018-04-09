var TOPIC_NAME = "mytest";
var _consumer = null; 

module.exports.initConsumer = function(consumer)
{
	consumer.on('message', function (message) {
	    console.log(message);
	});

	consumer.on('error', function (err) {
	    console.log('Error:',err);
	});

	consumer.on('offsetOutOfRange', function (err) {
	    console.log('offsetOutOfRange:',err);
	});

	this._consumer = consumer;
}

module.exports.getTopicName = function()
{

	return TOPIC_NAME
}