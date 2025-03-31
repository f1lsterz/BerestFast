import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useState } from 'react';

const [phoneNumber, setPhoneNumber] = useState('');
const [verificationId, setVerificationId] = useState('');
const [code, setCode] = useState('');
const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

const sendVerificationCode = async () => {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  } catch (error) {
    console.log("Помилка відправки коду: ", error);
  }
};
