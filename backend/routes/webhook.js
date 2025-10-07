import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
const router = express.Router();
const db = admin.firestore();

router.post('/paystack/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const body = JSON.parse(req.body.toString());
    const event = body.event;
    if (event === 'charge.success') {
      const data = body.data;
      const email = data.customer?.email;
      const usersSnap = await db.collection('users').where('email','==', email).limit(1).get();
      if (!usersSnap.empty) {
        const userDoc = usersSnap.docs[0];
        await userDoc.ref.update({ plan: 'pro' });
      }
      await db.collection('transactions').add({
        email, reference: data.reference, amount: data.amount, event, createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send('error');
  }
});

export default router;
