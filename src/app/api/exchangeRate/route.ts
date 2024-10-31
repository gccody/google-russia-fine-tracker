// app/exchangeRate/route.ts
import axios from 'axios';
import { NextResponse } from 'next/server';

interface ExchangeRateResponse {
  rates: Record<string, number>;
  base_code: string;
  date: string;
}

let exchangeRateData: ExchangeRateResponse | null = null;
let lastFetchedDate: string | null = null;

export async function GET() {
  const today = new Date().toISOString().split('T')[0];

  if (exchangeRateData && lastFetchedDate === today) {
    console.log("Cached", exchangeRateData);
    return NextResponse.json(exchangeRateData);
  }

  try {
    const response = await axios.get<ExchangeRateResponse>(
      `https://open.er-api.com/v6/latest/RUB`
    );
    exchangeRateData = response.data;
    lastFetchedDate = today;

    console.log("No Cache", exchangeRateData);
    return NextResponse.json(exchangeRateData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch exchange rates' }, { status: 500 });
  }
}
