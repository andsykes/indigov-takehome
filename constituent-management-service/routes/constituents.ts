import express from 'express';
import { getConstituentsDb } from '../model/dataStore';

const router = express.Router();

/* GET constituents listing. */
router.get('/', async (req, res, next) => {
  try {
    const db = await getConstituentsDb();
    const constituentsCollection = db.collections.constituents; // Access the 'constituents' collection
    if (!constituentsCollection) {
      return res.status(500).json({ error: 'Constituents collection not found' });
    }
    const constituents = await constituentsCollection.find().exec(); // Fetch documents from the collection
    res.json(constituents);
  } catch (error) {
    next(error);
  }
});

export default router;
