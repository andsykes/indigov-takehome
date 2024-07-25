import express from 'express';
import { getConstituentsDb } from '../model/dataStore';
import { parse } from 'json2csv';

const router = express.Router();

export interface Constituent {
  firstName: string,
  lastName: string,
  address: string,
  email: string,
  signupTime: number
}

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

router.get('/export', async (req, res, next) => {
  try {
    const db = await getConstituentsDb();
    const constituentsCollection = db.collections.constituents; // Access the 'constituents' collection
    if (!constituentsCollection) {
      return res.status(500).json({ error: 'Constituents collection not found' });
    }
    const constituents = await constituentsCollection.find().exec(); // Fetch documents from the collection

    // Convert documents to plain objects
    const data = constituents.map(doc => doc.toJSON());
    const fields = ['firstName', 'lastName', 'address', 'email', 'signupTime'];


    // Convert JSON data to CSV
    const csv = data.length > 0
      ? parse(data, { fields })
      : parse([], { fields });

    // Set headers to prompt download
    res.setHeader('Content-disposition', 'attachment; filename=constituents_export.csv');
    res.setHeader('Content-type', 'text/csv');

    // Send the CSV data as the response
    res.send(csv);
  } catch (error) {
    next(error);
  }
});

router.post('/add', async (req, res, next) => {
  try {
    const db = await getConstituentsDb();
    const params = req.body as Constituent;

    const constituentsCollection = db.collections.constituents; // Access the 'constituents' collection
    if (!constituentsCollection) {
      return res.status(500).json({ error: 'Constituents collection not found' });
    }
    // Process the request (e.g., save to database)
    res.send(`Received item with params: ${params}`);

    const newUser = await constituentsCollection.insert({
      firstName: params.firstName,
      lastName: params.lastName,
      address: params.address,
      email: params.email
    });
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

export default router;