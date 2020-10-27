//access mongoose
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialmedia', {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

//exports mongoose connection for use outside of file
module.exports = mongoose.connection;