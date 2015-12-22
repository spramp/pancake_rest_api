var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost/pancakes';

mongoose.connect(connectionString);

mongoose.connection.on('connected', function() {
  console.log("Connection Established!");
});

mongoose.connection.on('disconnected', function() {
  console.log("Disconnected!");
});

mongoose.connection.on('error', function(err) {
  console.log(err);
});
