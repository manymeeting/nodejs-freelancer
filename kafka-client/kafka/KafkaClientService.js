var kafka = require('kafka-node');
var Producer = kafka.Producer;
var Consumer = kafka.Consumer;

var config = require('config');
var crypto = require('crypto');

const TIMEOUT = 7000;
// designed to be a singleton
function KafkaClientService()
{
	if(KafkaClientService._instance)
	{
		return KafkaClientService._instance;
	}

	this.initialize();
	KafkaClientService._instance = this;
}

KafkaClientService._instance = null;
KafkaClientService.ADDR = config.kafka.addr;

KafkaClientService.prototype.initialize = function()
{
    this.producer = new Producer(this.getClient());
    this.requests = {}; // requests waiting for response
    this.consumerPool = {};
    this.bindProducerListeners();
    
}

KafkaClientService.prototype.getClient = function()
{
	return new kafka.Client(KafkaClientService.ADDR);
}

KafkaClientService.prototype.bindProducerListeners = function()
{
	this.producer.on('ready', function () {
	    console.log('Kafka Client: Producer is ready');
	});

	this.producer.on('error', function (err) {
	    console.log('Kafka Client: Producer is in error state');
	    console.log(err);
	});
}


KafkaClientService.prototype.getOffset = function()
{
	return new kafka.Offset(this.getClient());
}

KafkaClientService.prototype.getConsumer = function(topic, partition = 0, offset = 0)
{
	// reuse existing consumer on this topic
	if(this.consumerPool[topic])
	{
		return this.consumerPool[topic];
	}

	var consumer = new Consumer(this.getClient(), [{ topic: topic, partition: partition, offset: offset }], {fromOffset: true});
	// register this consumer to pool
	this.consumerPool[topic] = consumer;
	return consumer;
}

KafkaClientService.prototype.sendMessage = function(topic, partition, content, callback)
{
	var _kafkaClientService = this;
	var reqID = crypto.randomBytes(16).toString('hex');
	content["reqID"] = reqID;

	var payloads = [
        { 
        	topic: topic,
        	partition: partition,
        	messages: JSON.stringify(content)
        }
    ];

    // setup timeout handler
    var timeout = setTimeout(function(reqID){
    	callback(new Error("Kafka Client Service[TIMEOUT]: " + reqID));
    	delete _kafkaClientService.requests[reqID];
    }, TIMEOUT, reqID);

    this.requests[reqID] = {
    	callback: callback,
    	timeout: timeout
    };

    this._setResponseConsumer(content.topicRes);
    
    this.producer.send(payloads, function (err, data) {
    	if(err)
    	{
    		console.log("Kafka Client: Error sendMessage");
    		throw err;
    	}
    });
}

KafkaClientService.prototype._setResponseConsumer = function(topicRes)
{
	// reuse existing consumer on this topic
	if(this.consumerPool[topicRes])
	{
		return;
	}

	// currently only supprot fetching from the latest offsets
	var _kafkaClientService = this;
	var offset = _kafkaClientService.getOffset();
	var partition = 0;
	offset.fetch([{ topic: topicRes, partition: partition, time: -1 }], function (err, data) {
		if(err)
		{
			throw err;
		}
		var latestOffset = data[topicRes]['0'][0];
		console.log("latestOffset: " + latestOffset);

		var consumer = _kafkaClientService.getConsumer(topicRes, partition, latestOffset);

		consumer.on('message', function (message) {
		    console.log(message);
	        var result = JSON.parse(message.value);
	        // get the reqID
	        var reqID = result.reqID;
	        if(reqID in _kafkaClientService.requests){
	            //retrieve the request entry
	            var reqEntry = _kafkaClientService.requests[reqID];
	            clearTimeout(reqEntry.timeout);
	            reqEntry.callback(null, result.data);
	            //delete the entry from request pool 
	            delete _kafkaClientService.requests[reqID];
	        }

		});

	});
}


module.exports = new KafkaClientService();