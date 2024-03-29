const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

const connectDB = async () => {
  try {
    await mongoose
      .connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mearn-notes-app.9v06i5d.mongodb.net/?retryWrites=true&w=majority`
      )
      .then(() => {
        console.log("Successfully connected to atlas");
      });
  } catch (error) {
    console.log(`Something went wrong: ${error.message}`);
  }
};

connectDB();

const app = express();
app.use(express.json())

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
