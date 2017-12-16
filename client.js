var net = require('net');

var client = new net.Socket();
client.connect(6000, '127.0.0.1', function() {
	console.log('Connected');
  const data = Buffer.from([
    0x78, 0x78, 0x0d, 0x01, 0x03, 0x58, 0x73, 0x50, 0x71, 0x02, 0x49, 0x95, 0x00, 0x12, 0x66, 0x93
  ])
	client.write(data);
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});
