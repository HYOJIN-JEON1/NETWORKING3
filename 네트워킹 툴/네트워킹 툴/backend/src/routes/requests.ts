import express from 'express';
import Request from '../models/Request';
const router = express.Router();

router.get('/', async (req, res) => {
  const reqs = await Request.find();
  res.json(reqs);
});

router.post('/', async (req, res) => {
  const reqObj = new Request(req.body);
  await reqObj.save();
  res.json(reqObj);
});

router.put('/:id', async (req, res) => {
  const reqObj = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(reqObj);
});

export default router; 