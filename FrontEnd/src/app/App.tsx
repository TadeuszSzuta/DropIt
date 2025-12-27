import { useState } from 'react';
import { ProductDropScreen } from './components/ProductDropScreen';
import { CheckoutScreen } from './components/CheckoutScreen';

export default function App() {
  const [screen, setScreen] = useState<'product' | 'checkout'>('product');

  return (
    <div className="size-full">
      {screen === 'product' && (
        <ProductDropScreen onBuyNow={() => setScreen('checkout')} />
      )}
      {screen === 'checkout' && (
        <CheckoutScreen onBack={() => setScreen('product')} />
      )}
    </div>
  );
}
