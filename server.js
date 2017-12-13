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

  // Send a nice welcome message and announce
  socket.write("Welcome " + socket.name + "\n");
  // broadcast(socket.name + " joined the chat\n", socket);

  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    console.log('Data socket', data)
    console.log('Test ', Buffer.isBuffer(data))
    console.log('Test data read uint ', data.readUInt8(0))
    const id = data.slice(4,8)
    const msg = data.toString()
    console.log('test thu coi', msg)
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
