const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const cors = require('cors');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();
// app.use(cors());

// Parse JSON data
app.use(bodyParser.json());
// Parse url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.ATLAS_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to db && listening on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error)
  });