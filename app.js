const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 30000;

// URI для подключения к MongoDB
const mongoURI = 'mongodb+srv://Vika:Vika1234@cluster0.pu4v6dc.mongodb.net/goIT?retryWrites=true&w=majority';

// Подключение к MongoDB без устаревших опций
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  });

// Маршруты
app.get('/', (req, res) => {
  res.send('Hello World!');
});



