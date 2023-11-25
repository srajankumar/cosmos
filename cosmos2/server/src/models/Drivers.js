import mongoose from "mongoose";

// Define a MongoDB schema for driver data
const DriverSchema = new mongoose.Schema(
  {
    // Name of the Driver
    // username: {
    //   type: String,
    //   required: [true, "Please add a name"],
    // },

    // Name
    name: {
      type: String,
      required: [true, "Please add a name"],
    },

    // Email
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      // Regular expression for email validation
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },

    // Phone of the driver
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
      default: "+91",
    },

    experience: {
      type: String,
      required: [true, "Please add a name"],
    },

    qualification: {
      type: String,
      required: [true, "Please add a name"],
    },

    interest: {
      type: String,
      required: [true, "Please add a name"],
    },

    country: {
      type: String,
      required: [true, "Please add a name"],
    },

    website: {
      type: String,
      required: [true, "Please add a name"],
    },

    // Password of the driver
    // password: {
    //   type: String,
    //   required: [true, "Please add a password"],
    //   // Password length constraints
    //   minLength: [6, "Password must be at least 6 characters"],
    // },

    savedInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "drivers" }],
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' timestamps
    timestamps: true,
  }
);

// Create a Driver model based on the schema
export const DriverModel = mongoose.model("drivers", DriverSchema);
