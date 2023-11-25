// const SessionDuration = require('../models/SessionDuration');

// const storeSessionDuration = async (userId, formattedDuration) => {
//   const startTime = window.localStorage.getItem('timerStartTime');
//   if (!startTime) {
//     return; // No start time recorded, skip storing duration
//   }

//   const endTime = Date.now();
//   const duration = Math.floor((endTime - parseInt(startTime)) / 1000); // in seconds
//   console.log(duration);

//   const sessionDuration = new SessionDuration({
//     userId,
//     formattedDuration,
//     startTime,
//     endTime,
//   });

//   await sessionDuration.save();
// };

import express from "express";
import  {SessionDuration}  from "../models/SessionDuration.js";
const router = express.Router();
export {router as SessionDuration2}

router.post('/time', async (req, res) => {
    const formattedDuration = req.body.formattedDuration;
    const userId = req.body.userId; // Add the user ID to the request body
  
    // Store the duration in a database or perform other processing
    console.log('Received session duration:', formattedDuration);
  
    const sessionDuration = new SessionDuration({
      userId,
      formattedDuration,
    });
  
    await sessionDuration.save(); // Save the session duration data to MongoDB
  
    res.send({ message: 'Duration received successfully' });
  });