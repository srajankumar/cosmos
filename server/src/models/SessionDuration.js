import mongoose from "mongoose";

const sessionDurationSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  formattedDuration: { type: String, required: true },
//   startTime: { type: Date, required: true },
//   endTime: { type: Date, required: true },
});

export const SessionDuration = mongoose.model('SessionDuration', sessionDurationSchema);
