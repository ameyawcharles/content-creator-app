import express from 'express';
import admin from 'firebase-admin';
const router = express.Router();
const db = admin.firestore();

router.get('/admin/users', async (req, res) => {
  try {
    const snap = await db.collection('users').orderBy('createdAt','desc').get();
    const users = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(users);
  } catch (err) { res.status(500).json({ message: 'Failed' }); }
});

export default router;
