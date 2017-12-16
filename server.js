// Load the TCP Library
net = require('net');

// Keep track of the chat clients
var clients = [];

// Start a TCP Server
net.createServer(function (socket) {

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort

  // Put this new client in the list
  clients.push(socket);

  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    console.log('Data buffer', data)
    console.log('Data length ', Buffer.byteLength(data))
    console.log(data.toString('utf16le'))
    const packetLength = data[2]
    console.log('Data content length', packetLength)
    console.log('Test data length', parseInt( '' + packetLength, 16))
    const protocolNumber = data[3]
    switch (protocolNumber) {
      case 0x01:
        console.log('Login message')
        break;
      case 0x22:
        console.log('Location Data (UTC)')
        break;
      case 0x13:
        console.log('Status information')
        break;
      case 0x21:
        console.log('String information')
        break;
      case 0x26:
        console.log('Alarm data')
        break;
      case 0x27:
        console.log('Time zone and time')
        break;
      case 0x2A:
        console.log('GPS, query address information by phone number')
        break;
      case 0x80:
        console.log('Command information sent by the server to the terminal')
        break;
      default:
        console.log('Unrecognized data')
        break;
    }

  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    console.log('Data socket end ')
    // broadcast(socket.name + " left the chat.\n");
  });

  socket.on('error', function (error) {
    console.error('Socket error ', error)
    // broadcast(socket.name + " left the chat.\n");
  });

  // Send a message to all clients
  // function broadcast(message, sender) {
  //   clients.forEach(function (client) {
  //     // Don't want to send it to sender
  //     if (client === sender) return;
  //     client.write(message);
  //   });
  //   // Log it to the server output too
  //   process.stdout.write(message)
  // }

}).listen(6000);


// Put a friendly message on the terminal of the server.
console.log("Chat server running at port 6000\n");
