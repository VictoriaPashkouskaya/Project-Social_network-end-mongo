const mongoose = require('mongoose');
const express = require('express');
const userRouters = require('./routers/userRouters')
const userModels = require('./models/users')
const PostRouters = require('./routers/PostRouter')
const PostModels = require('./models/post')
const commitRouter = require('./routers/commitRouter');
const commitModels = require('./models/commit')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
///668fab8d6e7ae38da050fc47

// Routes
app.get('/', (req, res) => {
  res.send('Hello frand! Welcom to network goIT');
});

app.use('/api', userRouters);
app.use('/api/users',userModels);
app.use('/api',PostRouters);
app.use('/api', commitRouter);


// Handler for POST request to /api/login
app.post('/api/login', (req, res) => {
  // Retrieve data from the request body
  const { username, password } = req.body;

  // Example login check (for demonstration purposes)
  if (username === 'user' && password === 'password') {
    res.status(200).json({ message: 'Successful login' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

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