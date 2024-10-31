// app/page.tsx
import FineCalculator from '@/components/FineCalculator';
import { GetStaticPropsResult } from 'next';

interface ExchangeRates {
  [key: string]: number;
}

interface HomeProps {
  exchangeRates: ExchangeRates;
}

export async function getStaticProps(): Promise<GetStaticPropsResult<HomeProps>> {
  const exchangeRateData = await fetch('https://open.er-api.com/v6/latest/RUB');
  const exchangeRates = await exchangeRateData.json();

  return {
    props: {
      exchangeRates: exchangeRates.rates || {},
    },
    revalidate: 86400, // Revalidate once per day (24 hours)
  };
}
const Home: React.FC<HomeProps> = ({ exchangeRates }) => {
  return (
    <main>
      <FineCalculator exchangeRates={exchangeRates} />
    </main>
  );
};

export default Home;