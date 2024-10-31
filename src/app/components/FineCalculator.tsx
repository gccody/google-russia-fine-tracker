"use client"
// app/components/FineCalculator.tsx
import { useEffect, useState } from 'react';

interface FineCalculatorProps {
  exchangeRates: Record<string, number>;
}

const initialFine = 2.5 * Math.pow(10, 33); // 2.5 decillion RUB
const secondsPerWeek = 7 * 24 * 60 * 60;
const growthRatePerSecond = Math.pow(2, 1 / secondsPerWeek); // Calculate growth rate per second

function calculateFine(startDate: string): number {
  const now = new Date();
  const secondsSinceStart = Math.floor(
    (now.getTime() - new Date(startDate).getTime()) / 1000
  );
  return initialFine * Math.pow(growthRatePerSecond, secondsSinceStart);
}

const FineCalculator: React.FC<FineCalculatorProps> = ({ exchangeRates }) => {
  const [fineAmount, setFineAmount] = useState<number>(
    calculateFine('2024-10-10')
  );
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  useEffect(() => {
    const interval = setInterval(() => {
      setFineAmount(calculateFine('2024-10-10'));
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const convertedFine = (
    fineAmount * (exchangeRates[selectedCurrency] || 1)
  ).toLocaleString(selectedCurrency);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
      <h1>Fine Amount (doubles weekly):</h1>
      <p>In RUB: {fineAmount.toLocaleString("RUB")}</p>
      <p>
        In {selectedCurrency}: {convertedFine}
      </p>
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
