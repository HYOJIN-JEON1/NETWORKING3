import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  cohort: String,
  company: String,
  position: String,
  bio: String,
  photoUrl: String,
  tags: {
    skill: [String],
    interest: [String],
    help: [String]
  },
  connectionSettings: {
    fintechChat: Boolean,
    ceoChat: Boolean,
    jobOffer: Boolean,
    lectureOffer: Boolean
  }
});

export default mongoose.model('User', UserSchema); 