// app/page.tsx
import FineCalculator from '@/components/FineCalculator';
import { getBaseUrl } from '@/lib/getBaseUrls';

interface ExchangeRates {
  [key: string]: number;
}

async function fetchExchangeRates(): Promise<ExchangeRates> {
  const res = await fetch(`${getBaseUrl()}/api/exchangeRate`, {
    next: { revalidate: 86400 }, // Revalidate once every 24 hours
  });
  console.log(getBaseUrl(), res);
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
