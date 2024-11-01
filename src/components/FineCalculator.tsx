"use client"
import { useEffect, useState } from 'react';

interface FineCalculatorProps {
  exchangeRates: Record<string, number>;
}

const initialFine = 2.5 * Math.pow(10, 36); // 2.5 decillion RUB
const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
const growthRatePerMillisecond = Math.pow(2, 1 / millisecondsPerWeek);

function calculateFine(startDate: string): number {
  const now = new Date();
  const millisecondsSinceStart = now.getTime() - new Date(startDate).getTime();
  return initialFine * Math.pow(growthRatePerMillisecond, millisecondsSinceStart);
}

const FineCalculator: React.FC<FineCalculatorProps> = ({ exchangeRates }) => {
  const [fineAmount, setFineAmount] = useState<number | null>(null); // Null as placeholder
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  useEffect(() => {
    // Run only on the client after mounting
    const updateFine = () => {
      setFineAmount(calculateFine('2024-10-31'));
      requestAnimationFrame(updateFine); // Schedule the next update
    };

    // Start the update loop after mounting
    const animationFrameId = requestAnimationFrame(updateFine);

    return () => cancelAnimationFrame(animationFrameId); // Clean up on unmount
  }, []);

  // Display a loading state until fineAmount is calculated on the client
  const convertedFine = fineAmount
    ? (fineAmount * (exchangeRates[selectedCurrency] || 1)).toLocaleString(selectedCurrency)
    : 'Loading...';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
      <h1>Fine Amount:</h1>
      <p>In RUB: {fineAmount ? fineAmount.toLocaleString("RUB") : 'Loading...'}</p>
      <p>In {selectedCurrency}: {convertedFine}</p>
      <select
        onChange={(e) => setSelectedCurrency(e.target.value)}
        value={selectedCurrency}
      >
        {Object.keys(exchangeRates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FineCalculator;
