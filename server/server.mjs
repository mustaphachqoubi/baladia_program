
// server.mjs

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import depart from "./routes/depart.mjs";
import arrivee from "./routes/arrivee.mjs";
import { updateArrivee } from "./utils/updateArrivee.mjs"; // Import the update function

dotenv.config();

const uri = process.env.mongoDbURI;
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/depart", depart);
app.use("/arrivee", arrivee);

mongoose.connect(uri)
  .then(() => {
    // Update arrivee documents
    updateArrivee();

    // Start the server
    app.listen(PORT, () => {
      console.log("Connected to MongoDB successfully");
      console.log("Server is running on port", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

