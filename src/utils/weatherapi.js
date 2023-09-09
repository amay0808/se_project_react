import { checkResponse } from "../utils/api";

const latitude = 37.3022;
const longitude = -120.4829;
const APIkey = "ec819665b8e9b69fc9cee9d11ea26e49";

export const getForecastWeather = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
    );

    const data = await checkResponse(response);
    return data;
  } catch (error) {
    console.error("An error occurred while fetching the weather data", error);
    throw error;
  }
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const locationName = data.name;
  const weather = {
    locationName,
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
  };

  return weather;
};
