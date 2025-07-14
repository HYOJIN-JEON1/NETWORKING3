import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import users from './routes/users';
import opportunities from './routes/opportunities';
import requests from './routes/requests';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/networking-tool');

app.use('/api/users', users);
app.use('/api/opportunities', opportunities);
app.use('/api/requests', requests);

app.get('/', (req, res) => res.send('KDT Networking Tool API'));

app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000');
}); 