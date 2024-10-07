const session = require('express-session');

const sessionMiddleware = session({
    secret: 'mySecretKey',  // Choose a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
});

module.exports = sessionMiddleware;
