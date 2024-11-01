// app/page.tsx
import FineCalculator from '@/components/FineCalculator';

interface ExchangeRates {
  [key: string]: number;
}

async function fetchExchangeRates(): Promise<ExchangeRates> {
  // Fetch exchange rates from the API and use force-cache to cache it for 24 hours
  const res = await fetch('https://open.er-api.com/v6/latest/RUB', {
    next: { revalidate: 86400 }, // Revalidate once every 24 hours
  });

  if (!res.ok) {
    throw new Error('Failed to fetch exchange rates');
  }

  const data = await res.json();
  return data.rates;
}

export default async function Home() {
  const exchangeRates = await fetchExchangeRates();

  return (
    <main>
      <FineCalculator exchangeRates={exchangeRates} />
    </main>
  );
}
