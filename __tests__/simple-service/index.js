var messages = require('./proto/simple_pb');
var services = require('./proto/simple_grpc_pb');
const { Empty } = require('google-protobuf/google/protobuf/empty_pb');

var grpc = require('@grpc/grpc-js');

function simpleUnaryRequest(call, callback) {
  callback(null, new Empty());
}

function simpleClientStreamRequest(call, callback) {
  const result = ['test_message'];

  call.on('data', function(data) {
    result.push(data.toString())
  });

  call.on('end', function() {
    var message = new messages.SimpleMessage();
    message.setId(result.join(','));

    callback(null, message);
  });
}

function simpleServerStreamRequest(call) {
  const random = Math.floor(Math.random() * 10) + 1;

  for(let i = 0; i < random; i++) {
    var message = new messages.SimpleMessage();
    message.setId(i.toString());
    call.write(message);
  }

  call.end();
}

function simpleBidirectionalStreamRequest(call) {
  call.on('data', function(data) {
    console.log('note: ', data);

    var message = new messages.SimpleMessage();
    message.setId(data.toString());
    call.write(message);
  });

  call.on('end', function() {
    call.end();
  });
}

function main() {
  var server = new grpc.Server();

  server.addService(services.SimpleServiceService, {
    simpleUnaryRequest,
    simpleServerStreamRequest,
    simpleClientStreamRequest,
    simpleBidirectionalStreamRequest
  });
  server.bindAsync('0.0.0.0:4000', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('gRPC server started on 0.0.0.0:4000');
  });
}

main();
