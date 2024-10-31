// app/page.tsx
import FineCalculator from './components/FineCalculator';

interface ExchangeRates {
  [key: string]: number;
}

async function fetchExchangeRates(): Promise<ExchangeRates> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/exchangeRate`, {
    next: { revalidate: 86400 }, // Revalidate once every 24 hours
  });
  const data = await res.json();
  return data.rates || {};
}

export default async function Home() {
  const exchangeRates = await fetchExchangeRates();

  return (
    <main>
      <FineCalculator exchangeRates={exchangeRates} />
    </main>
  );
}
