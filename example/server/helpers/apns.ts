// import fs from 'fs';
// import jwt from 'jsonwebtoken';
// import axios from 'axios';

// // === Apple Developer configuration ===
// const TEAM_ID = process.env.APPLE_TEAM_ID; // Example: "A1B2C3D4E5"
// const KEY_ID = process.env.APPLE_KEY_ID; // Example: "XYZ12345"
// const BUNDLE_ID = process.env.APP_BUNDLE_ID; // Example: "com.yourapp"
// const AUTH_KEY_PATH = `./certs/AuthKey_${KEY_ID}.p8`;

// // Generate APNs authentication token (valid 1 hour)
// let cachedToken = null;
// let cachedAt = 0;

// function generateAPNSToken() {
//   if (cachedToken && Date.now() - cachedAt < 50 * 60 * 1000) {
//     return cachedToken; // reuse cached token (valid 1h)
//   }

//   const privateKey = fs.readFileSync(AUTH_KEY_PATH);
//   const token = jwt.sign({}, privateKey, {
//     algorithm: 'ES256',
//     issuer: TEAM_ID,
//     header: { alg: 'ES256', kid: KEY_ID },
//     expiresIn: '1h',
//   });

//   cachedToken = token;
//   cachedAt = Date.now();
//   return token;
// }

// // === Send notification to App ===
// export async function sendAPNSNotification(deviceToken, title, body) {
//   const apnsToken = generateAPNSToken();

//   const payload = {
//     aps: {
//       alert: { title, body },
//       sound: 'default',
//     },
//   };

//   const url = `https://api.push.apple.com/3/device/${deviceToken}`;

//   try {
//     const response = await axios.post(url, payload, {
//       headers: {
//         'apns-topic': BUNDLE_ID,
//         'apns-push-type': 'alert',
//         'authorization': `bearer ${apnsToken}`,
//       },
//       http2: true, // ignored but fine — APNs requires HTTP/2 (Axios uses http/1.1 under the hood)
//       timeout: 5000,
//     });

//     console.log('✅ APNs push success:', response.status);
//     return { success: true, status: response.status };
//   } catch (error) {
//     const status = error.response?.status;
//     const data = error.response?.data;
//     console.error('❌ APNs push failed:', status, data);
//     throw new Error(
//       `APNs push failed: ${status || 'unknown'} ${JSON.stringify(data || {})}`
//     );
//   }
// }
