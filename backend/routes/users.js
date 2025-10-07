import express from 'express';
import admin from 'firebase-admin';
const router = express.Router();
const db = admin.firestore();

async function verifyFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Bearer\s(.*)$/);
  if (!match) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = await admin.auth().verifyIdToken(match[1]);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

router.post('/register', verifyFirebaseToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const email = req.user.email || '';
    const userRef = db.collection('users').doc(uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      await userRef.set({ email, plan: 'free', createdAt: admin.firestore.FieldValue.serverTimestamp() });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

export default router;
