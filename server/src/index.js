import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";
import { driverRouter } from "./routes/drivers.js";
import { infoRouter } from "./routes/driverinfo.js";
import { vehicleRouter } from "./routes/vehicleinfo.js"; // Import the vehicle information routes
import { SessionDuration2 } from "./routes/SessionDuration.js";

// import { SessionDuration } from "./models/SessionDuration.js";

// import { duration } from "./routes/duration.js";

dotenv.config();

// Create an Express application
const app = express();

// Use middleware to handle JSON data and CORS
app.use(express.json());
app.use(cors());

// Define routes for authentication, drivers, driver information, and vehicle information
app.use("/auth", userRouter); // Authentication-related routes
app.use("/driver", driverRouter); // Routes for drivers
app.use("/driver", infoRouter); // Routes for driver information
app.use("/vehicle", vehicleRouter); // Routes for vehicle information
app.use("/storeDuration", SessionDuration2); // Routes for vehicle information
// app.use("/duration",duration)

// app.post('/storeDuration', async (req, res) => {
//   const duration = req.body.formattedDuration;
//   // Store the duration in a database or perform other processing
//   console.log('Received session duration:', duration);
//   res.send({ message: 'Duration received successfully' });
// });

// Connect to MongoDB using the provided URI
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB database!");
});

// Define the port for the server, using the provided port or defaulting to 3001
const port = process.env.PORT || 3001;

// Start the server and listen on the specified port
app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
