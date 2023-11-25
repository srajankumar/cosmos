import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { DriverModel } from "../models/Drivers.js";
import mongoose from "mongoose";

const router = express.Router();
export { router as driverRouter };

// User Registration Route
router.post("/register", async (req, res) => {
  // Extract email, username, password, and additional fields from the request body
  const {
    // email,
    // username,
    // password,
    // phone,
    // birthdate,
    // imageUrl,
    // license,
    // busID,
    // routeID,
    // experience,
    // bio,
    name,
    email,
    phone,
    experience,
    qualification,
    interest,
    country,
    website,
    selected,
  } = req.body;

  // Check if a driver with the same username already exists
  // const driver = await DriverModel.findOne({ username });

  // if (driver) {
  //   return res.json({ message: "Driver already exists!" });
  // }

  // Hash the password using bcrypt
  // const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new driver with the hashed password and additional fields, and save it to the database
  const newDriver = new DriverModel({
    // email,
    // username,
    // phone,
    // password: hashedPassword,
    // birthdate,
    // imageUrl,
    // license,
    // busID,
    // routeID,
    // experience,
    // bio,
    name,
    email,
    phone,
    experience,
    qualification,
    interest,
    country,
    website,
    selected,
  });
  await newDriver.save();

  res.json({ message: "Driver registered successfully!" });
});

// Example route handling the DELETE request
router.delete("/:driverId", async (req, res) => {
  const driverId = req.params.driverId;

  try {
    // Validate if the driverId is a valid ObjectId before attempting deletion
    if (!mongoose.Types.ObjectId.isValid(driverId)) {
      return res.status(400).json({ message: "Invalid driverId format" });
    }

    // Perform the deletion if the driverId is valid
    await DriverModel.findByIdAndDelete(driverId);
    res.json({ message: "Driver deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const driver = await DriverModel.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.json(driver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all drivers
router.get("/", async (req, res) => {
  try {
    const drivers = await DriverModel.find();
    res.json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// User Login Route
router.post("/login", async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Find the driver with the provided username
  const driver = await DriverModel.findOne({ username });
  if (!driver) {
    return res.json({ message: "Driver Doesn't exist" });
  }

  // Compare the provided password with the stored hashed password using bcrypt
  const isPasswordValid = await bcrypt.compare(password, driver.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or password is incorrect!" });
  }

  // If the password is valid, create a JWT token and send it as a response
  const token = jwt.sign({ id: driver._id }, "secret");
  res.json({ token, userID: driver._id });
});
