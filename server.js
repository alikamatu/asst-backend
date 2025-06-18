const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const assistanceRequests = require('./routes/assistanceRequests');

const app = express();


app.use(cors({
    origin: '*',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  app.use('/api/assistance-requests', assistanceRequests);

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });


const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});