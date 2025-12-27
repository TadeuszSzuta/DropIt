import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

interface ProductDropScreenProps {
  onBuyNow: () => void;
}

export function ProductDropScreen({ onBuyNow }: ProductDropScreenProps) {
  // Set drop end time to 24 hours from now
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="text-xl">DropIt</div>
        <div className="text-sm opacity-70">Limited Edition</div>
      </header>

      {/* Product Image */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1645784127155-a9f8f8fe647b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcm9kdWN0JTIwc25lYWtlcnN8ZW58MXx8fHwxNzY2ODUxMTU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Limited Edition Sneaker"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="px-6 space-y-4">
        <div>
          <h1 className="text-3xl mb-2">ULTRA BOOST X</h1>
          <p className="opacity-70">Limited Edition Release</p>
        </div>
        
        <div className="text-2xl">$249.99</div>

        {/* Countdown Timer */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <div className="text-center mb-3 opacity-70 text-sm">DROP ENDS IN</div>
          <div className="flex justify-center gap-4">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-mono bg-zinc-800 rounded-lg px-4 py-2 min-w-[80px]">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-xs mt-2 opacity-70">HOURS</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-mono bg-zinc-800 rounded-lg px-4 py-2 min-w-[80px]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-xs mt-2 opacity-70">MINUTES</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-mono bg-zinc-800 rounded-lg px-4 py-2 min-w-[80px]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-xs mt-2 opacity-70">SECONDS</div>
            </div>
          </div>
        </div>

        {/* Buy Now Button */}
        <Button 
          onClick={onBuyNow}
          className="w-full bg-white text-black hover:bg-gray-200 h-14 text-lg rounded-lg"
        >
          BUY NOW
        </Button>
        
        <div className="text-center text-xs opacity-50 pb-6">
          Only 100 units available
        </div>
      </div>
    </div>
  );
}
