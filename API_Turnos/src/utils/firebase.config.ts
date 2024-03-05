import admin, { ServiceAccount } from 'firebase-admin'
import json from './esportime-64845-firebase-adminsdk-tkyin-519ebd9ae7.json'


export const adminFirebase = admin.initializeApp({
  credential: admin.credential.cert(json as ServiceAccount),
})

// export const adminFirebase = admin.initializeApp(firebaseConfig)
