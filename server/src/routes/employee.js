import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { EmployeeModel } from "../models/Employee.js";

const router = express.Router();
export { router as employeeRouter };

// Employee Registration Route
router.post("/register", async (req, res) => {
  // Extract email, username, password, and additional fields from the request body
  const { email, username, password, phone } = req.body;

  // Check if a Employee with the same username already exists
  const employee = await EmployeeModel.findOne({ username });

  if (employee) {
    return res.json({ message: "Employee already exists!" });
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new Employee with the hashed password and additional fields, and save it to the database
  const newEmployee = new EmployeeModel({
    email,
    username,
    phone,
    password: hashedPassword,
  });
  await newEmployee.save();

  res.json({ message: "Employee registered successfully!" });
});

// Employee Login Route
router.post("/login", async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Find the Employee with the provided username
  const employee = await EmployeeModel.findOne({ username });
  if (!employee) {
    return res.json({ message: "Employee Doesn't exist" });
  }

  // Compare the provided password with the stored hashed password using bcrypt
  const isPasswordValid = await bcrypt.compare(password, employee.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or password is incorrect!" });
  }

  // If the password is valid, create a JWT token and send it as a response
  const token = jwt.sign({ id: employees._id }, "secret");
  res.json({ token, userID: employees._id });
});
