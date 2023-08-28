const mongoose = require('mongoose');

//connect moongoose to local connection and networkDB database
mongoose.connect('mongodb://127.0.0.1:27017/networkDB')

// export DB connection
module.exports = mongoose.connection;