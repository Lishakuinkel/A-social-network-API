// Import dependencies
const express = require('express');
const db = require('./ config/connection');
const routes = require('./routes');

// Setup enviroment variables
const PORT = process.env.PORT || 3001;
const app = express();

// Use middleware to parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Use routes defined in routes.js
app.use(routes);

// Connect to MongoDB database and start the server at PORT
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Listening at ${PORT}`);
    });
});


