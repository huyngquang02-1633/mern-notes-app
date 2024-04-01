const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const connectDB = async () => {
  try {
    await mongoose
      .connect(
        // `mongodb://127.0.0.1:27017/mearn-notes-app`
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
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

const PORT = process.env.POST || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
