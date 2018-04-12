var kafka = require('kafka-node');
var Producer = kafka.Producer;
var Consumer = kafka.Consumer;
// var config = require('config');

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
    this.client = new kafka.Client("138.68.20.94:2181"),
    this.consumerPool = {};
    this.producer = new Producer(this.client);

    this.producer.on("ready", function() {
    	console.log('Kafka Backend: Producer is ready');
    });

    this.producer.on("error", function(err) {
    	console.log('Kafka Backend: Producer is in error state');
	    console.log(err);
    });
    
}

KafkaBackendService.prototype.getOffset = function()
{
	return new kafka.Offset(new kafka.Client("138.68.20.94:2181"));;
}

KafkaBackendService.prototype.getConsumer = function(topic, partition = 0, offset = 0)
{
	// reuse existing consumer on this topic
	if(this.consumerPool[topic])
	{
		return this.consumerPool[topic];
	}

	var consumer = new Consumer(this.client, [{ topic: topic, partition: partition, offset: offset }], {fromOffset: true});
	// register this consumer to pool
	this.consumerPool[topic] = consumer;
	return consumer;
}


KafkaBackendService.prototype.sendMessage = function(topic, partition, content )
{	
	var payloads = [
        { 
        	topic: topic,
        	partition: partition,
        	messages: JSON.stringify(content)
        }
    ];

    this.producer.send(payloads, function (err, data) {
    	if(err)
    	{
    		console.log("Kafka Backend: Error sendMessage");
    		throw err;
    	}
    });
}

module.exports = new KafkaBackendService();