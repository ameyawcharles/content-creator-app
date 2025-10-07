import { PaystackButton } from 'react-paystack'
import { auth } from '../firebase'

export default function PayButton({ amount = 2500, onSuccess }) {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_yourPublicKeyHere'
  const user = auth.currentUser
  const email = user?.email || 'user@example.com'

  const componentProps = {
    email,
    amount: amount * 100, // in kobo
    publicKey,
    text: 'Upgrade to Pro',
    onSuccess,
    onClose: () => alert('Payment closed'),
  }

  return <PaystackButton {...componentProps} className="bg-yellow-500 text-white px-4 py-2 rounded" />
}
