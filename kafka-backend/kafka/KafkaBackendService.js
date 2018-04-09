var kafka = require('kafka-node');
var config = require('config');

// designed to be a singleton
function KafkaBackendService()
{
	if(KafkaBackendService._instance)
	{
		return KafkaBackendService._instance;
	}

	this.initialize();
	KafkaBackendService._instance = this;
}

KafkaBackendService._instance = null;


KafkaBackendService.prototype.initialize = function()
{
	var Producer = kafka.Producer;
	var Consumer = kafka.Consumer;

    this.client = new kafka.Client("138.68.20.94:2181"),
    this.consumerPool = {};
    this.producer = new Producer(this.client);

    this.producer.on("ready", function() {
    	console.log('Kafka Backend: Producer is ready');
    });

    this.producer.on("error", function() {
    	console.log('Kafka Backend: Producer is in error state');
	    console.log(err);
    });
    
}

KafkaBackendService.prototype.getConsumer = function(topic)
{
	var consumer = new Consumer(this.client, [{ topic: topic, partition: 0 }]);

	this.consumers.push(consumer);
	return consumer;
}


KafkaBackendService.prototype.sendMessage = function(topic, message, partition, callback)
{
	var payloads = [
        { topic: topic, messages: message , partition: partition }
    ];

    this.producer.send(payloads, function (err, data) {
    	if(err)
    	{
    		console.log("Kafka Backend: Error sendMessage");
    		throw err;
    	}
    	callback(err, data);
    });
}

module.exports = new KafkaBackendService();