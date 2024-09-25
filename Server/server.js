const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const routes = require('./routes/taskRoutes')
const app = express();

// Middleware
app.use(cors());
app.use(express.json())




// mongodb connection
const db = 'tasks-db'
const dbUri = `mongodb://localhost:27017/${db}`;

mongoose.connect(dbUri)

.then(()=>console.log('MongoDb connection successfull'))
.catch(err=>console.log('Error in MongoDb connection:',err))

// Routes
app.use('/api/tasks',routes)

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));