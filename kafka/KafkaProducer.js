var kafka = require('kafka-node');
var Producer = kafka.Producer,
    client = new kafka.Client("138.68.20.94:2181"),
    producer = new Producer(client);
