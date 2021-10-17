// import admin from "firebase-admin";

// const config = {
//   type: process.env.FIREBASE_TYPE,
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
// };
// let auth;
// try {
//   const userInstance = admin.initializeApp(
//     {
//       credential: admin.credential.cert(config),
//     },
//     "auth"
//   );
//   auth = userInstance.auth();
// } catch (error) {
//
// }

// const adminConfig = {
//   type: process.env.FIREBASE_TYPE_ADMIN,
//   project_id: process.env.FIREBASE_PROJECT_ID_ADMIN,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID_ADMIN,
//   private_key: process.env.FIREBASE_PRIVATE_KEY_ADMIN.replace(/\\n/g, "\n"),
//   client_email: process.env.FIREBASE_CLIENT_EMAIL_ADMIN,
//   client_id: process.env.FIREBASE_CLIENT_ID_ADMIN,
//   auth_uri: process.env.FIREBASE_AUTH_URI_ADMIN,
//   token_uri: process.env.FIREBASE_TOKEN_URI_ADMIN,
//   auth_provider_x509_cert_url:
//     process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL_ADMIN,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL_ADMIN,
// };
// let adminAuth;
// try {
//   const adminInstance = admin.initializeApp(
//     {
//       credential: admin.credential.cert(adminConfig),
//     },
//     "admin"
//   );
//   adminAuth = adminInstance.auth();
// } catch (error) {
//
// }

// export { auth, adminAuth };
