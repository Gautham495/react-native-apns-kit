// import express from 'express';
// import bodyParser from 'body-parser';
// import { sendAPNSNotification } from './helpers/apns.js';

// const app = express();
// app.use(bodyParser.json());

// // === Send notification to specific App token ===
// app.post('/send-notification', async (req, res) => {
//   const { token, title, body } = req.body;
//   if (!token || !title || !body)
//     return res.status(400).json({ error: 'Missing fields' });

//   try {
//     const result = await sendAPNSNotification(token, title, body);
//     res.json({ status: 'sent', result });
//   } catch (err) {
//     console.error('Notification error:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () =>
//   console.log(`🚀 APNS Notification Server running on port ${PORT}`)
// );
