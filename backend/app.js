import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js"; // Correct import
import blogRouter from "./routes/blog-routes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from a .env file

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 4000; // Use the PORT from .env or default to 4000

mongoose
  .connect(
    process.env.MONGO_URI || "your-default-mongo-uri-here", // Use MONGO_URI from .env or fallback
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Connected to Database and Listening on PORT ${PORT}`)
    )
  )
  .catch((err) => console.log(err));
