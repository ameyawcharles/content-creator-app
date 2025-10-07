import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import fs from 'fs';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './serviceAccountKey.json';
if (fs.existsSync(serviceAccountPath)) {
  admin.initializeApp({ credential: admin.credential.cert(JSON.parse(fs.readFileSync(serviceAccountPath,'utf8'))) });
} else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  admin.initializeApp();
} else {
  console.warn('Firebase service account not found. Set FIREBASE_SERVICE_ACCOUNT_PATH or GOOGLE_APPLICATION_CREDENTIALS.');
  try { admin.initializeApp(); } catch(e){ console.error(e.message); }
}

const db = admin.firestore();

import userRoutes from './routes/users.js';
import aiRoutes from './routes/ai.js';
import adminRoutes from './routes/admin.js';
import webhookRoutes from './routes/webhook.js';

app.use('/api', userRoutes);
app.use('/api', aiRoutes);
app.use('/api', adminRoutes);
app.use('/api', webhookRoutes);

app.get('/', (req, res) => res.send('✅ Backend running'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Listening on ${PORT}`));
