import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';

interface CheckoutScreenProps {
  onBack: () => void;
}

export function CheckoutScreen({ onBack }: CheckoutScreenProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setExpiry(formatExpiry(value));
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvv(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Order confirmed! 🎉');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center gap-3 border-b border-zinc-800">
        <button onClick={onBack} className="hover:opacity-70">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl">Checkout</h1>
      </header>

      {/* Order Summary */}
      <div className="px-6 py-6 border-b border-zinc-800">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-lg">ULTRA BOOST X</div>
            <div className="text-sm opacity-70">Limited Edition</div>
          </div>
          <div className="text-xl">$249.99</div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="flex-1 px-6 py-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <CreditCard className="w-5 h-5" />
            <h2 className="text-lg">Payment Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Card Number */}
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-white">Card Number</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={handleCardNumberChange}
                required
                className="bg-zinc-900 border-zinc-800 text-white h-12"
              />
            </div>

            {/* Cardholder Name */}
            <div className="space-y-2">
              <Label htmlFor="cardName" className="text-white">Cardholder Name</Label>
              <Input
                id="cardName"
                type="text"
                placeholder="JOHN DOE"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                required
                className="bg-zinc-900 border-zinc-800 text-white h-12"
              />
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry" className="text-white">Expiry Date</Label>
                <Input
                  id="expiry"
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={handleExpiryChange}
                  required
                  className="bg-zinc-900 border-zinc-800 text-white h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-white">CVV</Label>
                <Input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={handleCvvChange}
                  required
                  className="bg-zinc-900 border-zinc-800 text-white h-12"
                />
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-2 bg-zinc-900 p-4 rounded-lg">
              <Lock className="w-4 h-4 mt-0.5 opacity-70" />
              <p className="text-xs opacity-70">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-white text-black hover:bg-gray-200 h-14 text-lg rounded-lg mt-8"
            >
              {isProcessing ? 'PROCESSING...' : 'COMPLETE PURCHASE'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
