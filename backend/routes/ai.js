import express from 'express';
import admin from 'firebase-admin';
import axios from 'axios';
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

async function checkPlanLimit(req, res, next) {
  try {
    const uid = req.user.uid;
    const userDoc = await db.collection('users').doc(uid).get();
    const user = userDoc.exists ? userDoc.data() : null;
    if (user && user.plan === 'pro') return next();
    const start = new Date(); start.setUTCHours(0,0,0,0);
    const snap = await db.collection('scripts').where('userId','==', uid).where('createdAt','>=', admin.firestore.Timestamp.fromDate(start)).get();
    if (snap.size >= 3) return res.status(403).json({ message: 'Free plan limit reached (3/day)' });
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

router.post('/generate', verifyFirebaseToken, checkPlanLimit, async (req, res) => {
  try {
    const { topic, tone='educational', length='medium' } = req.body;
    if (!topic) return res.status(400).json({ message: 'Missing topic' });

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || 'gpt-4o-mini';
    const prompt = `Write a complete YouTube script about "${topic}" in a ${tone} tone. The script should be ${length} in length and include an intro, 3-5 main points, and an outro.`;

    const orRes = await axios.post('https://api.openrouter.ai/v1/chat/completions', {
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800
    }, { headers: { Authorization: `Bearer ${apiKey}` } });

    const scriptText = orRes.data?.choices?.[0]?.message?.content || JSON.stringify(orRes.data);
    await db.collection('scripts').add({
      userId: req.user.uid,
      topic, tone, length, generatedScript: scriptText, createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ success: true, script: scriptText });
  } catch (err) {
    res.status(500).json({ message: 'AI generation failed' });
  }
});

export default router;
