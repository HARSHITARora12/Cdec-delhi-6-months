

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sessionMiddleware = require('./middleware/sessionMiddleware');
const userRoutes = require('./routes/userRoutes');
const participantRoutes=require('./routes/particpantRoutes');
const eventRoutes=require('./routes/eventRoutes');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use session middleware
app.use(sessionMiddleware);

// Serve static files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// Use the user routes
app.use('/', userRoutes);
app.use('/',participantRoutes);
app.use('/api', eventRoutes);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});