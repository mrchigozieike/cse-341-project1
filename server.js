const express = require('express');
const createError = require('http-errors'); // Import http-errors
const mongodb = require('./data/database');
const app = express();

const swaggerUIPath = require("swagger-ui-express");
const swaggerjsonFilePath = require("./swagger-output.json");

// Swagger API documentation
app.use("/api-docs", swaggerUIPath.serve, swaggerUIPath.setup(swaggerjsonFilePath));

// Routes
app.use('/', require('./routes'));

// Catch 404 and forward to error handler using http-errors
app.use((req, res, next) => {
    next(createError(404, 'Not Found')); // Use createError to handle 404 errors
});

// Global error handler
app.use((err, req, res, next) => {
    // Set error status and message, default to 500 if not provided
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: statusCode,
        message: message,
    });
});

// Set port
const port = process.env.PORT || 5500;

// Initialize MongoDB connection and start the server
mongodb.initDb((err) => {
    if (err) {
        console.log('Database connection error:', err);
        process.exit(1); // Exit if unable to connect to the database
    } else {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    }
});
