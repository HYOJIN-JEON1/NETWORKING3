import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String, // chat, job, project 등
  message: String,
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
});

export default mongoose.model('Request', RequestSchema); 