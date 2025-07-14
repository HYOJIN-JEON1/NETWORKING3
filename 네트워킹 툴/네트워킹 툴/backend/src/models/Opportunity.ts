import mongoose from 'mongoose';

const OpportunitySchema = new mongoose.Schema({
  category: String,
  title: String,
  company: String,
  position: String,
  description: String,
  requirements: String,
  deadline: String,
  recommender: String,
  eventDate: String,
  location: String,
  target: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Opportunity', OpportunitySchema); 