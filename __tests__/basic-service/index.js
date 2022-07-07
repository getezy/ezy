var messages = require('./proto/basic_pb');
var services = require('./proto/basic_grpc_pb');

var grpc = require('@grpc/grpc-js');

function basicRequest(call, callback) {
  var messagee = new messages.BasicMessage();
  messagee.setId(call.request.getId());
  callback(null, messagee);
}

function main() {
  var server = new grpc.Server();
  server.addService(services.BasicServiceService, { basicRequest });
  server.bindAsync('0.0.0.0:4000', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('gRPC server started on 0.0.0.0:4000');
  });
}

main();
