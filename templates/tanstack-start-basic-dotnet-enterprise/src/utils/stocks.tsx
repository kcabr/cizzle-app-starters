import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type Stock = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sector: string;
  marketCap: number;
  volume: number;
  pe: number;
  dividend: number;
  dayHigh: number;
  dayLow: number;
  weekHigh52: number;
  weekLow52: number;
  updateTime: string;
};

// Mock data - would be replaced with a real API in production
const mockStocks: Stock[] = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 172.82,
    change: 1.34,
    changePercent: 0.78,
    sector: "Technology",
    marketCap: 2840000000000,
    volume: 53220000,
    pe: 28.64,
    dividend: 0.58,
    dayHigh: 174.02,
    dayLow: 171.55,
    weekHigh52: 182.94,
    weekLow52: 124.17,
    updateTime: new Date().toISOString(),
  },
  {
    id: "2",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 389.12,
    change: 3.66,
    changePercent: 0.95,
    sector: "Technology",
    marketCap: 2890000000000,
    volume: 22145000,
    pe: 37.52,
    dividend: 0.68,
    dayHigh: 390.47,
    dayLow: 385.17,
    weekHigh52: 395.41,
    weekLow52: 271.22,
    updateTime: new Date().toISOString(),
  },
  {
    id: "3",
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 175.35,
    change: -1.12,
    changePercent: -0.64,
    sector: "Consumer Cyclical",
    marketCap: 1810000000000,
    volume: 32678000,
    pe: 59.12,
    dividend: 0,
    dayHigh: 177.45,
    dayLow: 174.82,
    weekHigh52: 185.05,
    weekLow52: 118.35,
    updateTime: new Date().toISOString(),
  },
  {
    id: "4",
    symbol: "GOOG",
    name: "Alphabet Inc.",
    price: 156.28,
    change: 2.21,
    changePercent: 1.43,
    sector: "Communication Services",
    marketCap: 1960000000000,
    volume: 19726000,
    pe: 26.78,
    dividend: 0,
    dayHigh: 156.98,
    dayLow: 154.32,
    weekHigh52: 158.56,
    weekLow52: 104.65,
    updateTime: new Date().toISOString(),
  },
  {
    id: "5",
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 494.15,
    change: -3.28,
    changePercent: -0.66,
    sector: "Communication Services",
    marketCap: 1260000000000,
    volume: 14752000,
    pe: 28.19,
    dividend: 0,
    dayHigh: 498.64,
    dayLow: 491.23,
    weekHigh52: 531.49,
    weekLow52: 274.38,
    updateTime: new Date().toISOString(),
  },
  {
    id: "6",
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 172.63,
    change: -5.44,
    changePercent: -3.05,
    sector: "Consumer Cyclical",
    marketCap: 550000000000,
    volume: 95467000,
    pe: 48.9,
    dividend: 0,
    dayHigh: 177.12,
    dayLow: 170.25,
    weekHigh52: 278.98,
    weekLow52: 138.8,
    updateTime: new Date().toISOString(),
  },
  {
    id: "7",
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 195.43,
    change: 1.78,
    changePercent: 0.92,
    sector: "Financial Services",
    marketCap: 564000000000,
    volume: 7854000,
    pe: 11.75,
    dividend: 4.15,
    dayHigh: 196.21,
    dayLow: 193.82,
    weekHigh52: 200.48,
    weekLow52: 135.19,
    updateTime: new Date().toISOString(),
  },
  {
    id: "8",
    symbol: "V",
    name: "Visa Inc.",
    price: 277.18,
    change: 2.15,
    changePercent: 0.78,
    sector: "Financial Services",
    marketCap: 569000000000,
    volume: 5236000,
    pe: 32.85,
    dividend: 1.8,
    dayHigh: 278.45,
    dayLow: 275.12,
    weekHigh52: 290.96,
    weekLow52: 227.78,
    updateTime: new Date().toISOString(),
  },
  {
    id: "9",
    symbol: "WMT",
    name: "Walmart Inc.",
    price: 65.82,
    change: 0.37,
    changePercent: 0.57,
    sector: "Consumer Defensive",
    marketCap: 530000000000,
    volume: 13852000,
    pe: 28.61,
    dividend: 1.6,
    dayHigh: 66.12,
    dayLow: 65.45,
    weekHigh52: 67.75,
    weekLow52: 48.34,
    updateTime: new Date().toISOString(),
  },
  {
    id: "10",
    symbol: "KO",
    name: "The Coca-Cola Company",
    price: 61.45,
    change: 0.23,
    changePercent: 0.38,
    sector: "Consumer Defensive",
    marketCap: 265000000000,
    volume: 9725000,
    pe: 24.53,
    dividend: 1.92,
    dayHigh: 61.68,
    dayLow: 61.21,
    weekHigh52: 64.25,
    weekLow52: 54.01,
    updateTime: new Date().toISOString(),
  },
];

// Server function to get all stocks
export const getAllStocks = createServerFn({ method: "GET" }).handler(() => {
  // Simulating server-side data fetch delay
  return new Promise<Stock[]>((resolve) => {
    setTimeout(() => resolve(mockStocks), 500);
  });
});

// Server function to get stock by ID
export const getStockById = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(({ data: id }) => {
    // Simulating server-side data fetch with delay
    return new Promise<Stock>((resolve, reject) => {
      setTimeout(() => {
        const stock = mockStocks.find((s) => s.id === id);
        if (stock) {
          resolve(stock);
        } else {
          reject(new Error(`Stock with ID ${id} not found`));
        }
      }, 500);
    });
  });

// Server function to filter stocks by sector
export const getStocksBySector = createServerFn({ method: "GET" })
  .validator((sector: string) => sector)
  .handler(({ data: sector }) => {
    // Simulating server-side filtering with delay
    return new Promise<Stock[]>((resolve) => {
      setTimeout(() => {
        if (sector === "all") {
          resolve(mockStocks);
        } else {
          const filteredStocks = mockStocks.filter(
            (s) => s.sector.toLowerCase() === sector.toLowerCase()
          );
          resolve(filteredStocks);
        }
      }, 500);
    });
  });

// React Query options for fetching all stocks
export const allStocksQueryOptions = () =>
  queryOptions({
    queryKey: ["stocks"],
    queryFn: () => getAllStocks(),
  });

// React Query options for fetching a stock by ID
export const stockByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["stocks", id],
    queryFn: () => getStockById({ data: id }),
  });

// React Query options for filtering stocks by sector
export const stocksBySectorQueryOptions = (sector: string) =>
  queryOptions({
    queryKey: ["stocks", "sector", sector],
    queryFn: () => getStocksBySector({ data: sector }),
  });
