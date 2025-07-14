import express from 'express';
import Opportunity from '../models/Opportunity';
const router = express.Router();

router.get('/', async (req, res) => {
  const opps = await Opportunity.find();
  res.json(opps);
});

router.post('/', async (req, res) => {
  const opp = new Opportunity(req.body);
  await opp.save();
  res.json(opp);
});

export default router; 