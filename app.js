const mongoose = require('mongoose');
const express = require('express');
const userRouters = require('./routers/userRouters')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

// Middleware
app.use(express.json());


// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Используем маршруты пользователей
app.use('/api', userRouters);

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

// Error handling middleware (defined at the end)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});