import { queryOptions } from "@tanstack/react-query";
import axios from "redaxios";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type WeatherData = {
  id: string;
  city: string;
  country: string;
  temperature: number;
  conditions: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  updatedAt: string;
};

// Mock data - would be replaced with a real API in production
const mockWeatherData: WeatherData[] = [
  {
    id: "1",
    city: "New York",
    country: "US",
    temperature: 24,
    conditions: "Partly Cloudy",
    humidity: 65,
    windSpeed: 8,
    icon: "partly_cloudy",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    city: "London",
    country: "UK",
    temperature: 18,
    conditions: "Rainy",
    humidity: 80,
    windSpeed: 12,
    icon: "rainy",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    city: "Tokyo",
    country: "JP",
    temperature: 29,
    conditions: "Sunny",
    humidity: 55,
    windSpeed: 5,
    icon: "sunny",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    city: "Sydney",
    country: "AU",
    temperature: 22,
    conditions: "Clear",
    humidity: 60,
    windSpeed: 10,
    icon: "clear",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    city: "Berlin",
    country: "DE",
    temperature: 15,
    conditions: "Cloudy",
    humidity: 70,
    windSpeed: 15,
    icon: "cloudy",
    updatedAt: new Date().toISOString(),
  },
];

// Server function to get weather for all cities
export const getWeatherData = createServerFn({ method: "GET" }).handler(() => {
  // Simulating server-side data fetch delay
  return new Promise<WeatherData[]>((resolve) => {
    setTimeout(() => resolve(mockWeatherData), 500);
  });
});

// Server function to get weather for a specific city
export const getCityWeather = createServerFn({ method: "GET" })
  .validator((cityId: string) => cityId)
  .handler(({ data: cityId }) => {
    // Simulating server-side data fetch delay
    return new Promise<WeatherData>((resolve, reject) => {
      setTimeout(() => {
        const cityData = mockWeatherData.find((w) => w.id === cityId);
        if (cityData) {
          resolve(cityData);
        } else {
          reject(new Error(`Weather data for city ID ${cityId} not found`));
        }
      }, 500);
    });
  });

// React Query options for fetching all weather data
export const weatherDataQueryOptions = () =>
  queryOptions({
    queryKey: ["weather"],
    queryFn: () => getWeatherData(),
  });

// React Query options for fetching a specific city's weather
export const cityWeatherQueryOptions = (cityId: string) =>
  queryOptions({
    queryKey: ["weather", cityId],
    queryFn: () => getCityWeather({ data: cityId }),
  });
