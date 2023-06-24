const latitude = 37.325954;
const longitude = -120.499992;
const APIkey = "ec819665b8e9b69fc9cee9d11ea26e49";

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    console.log(res);
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
  return weatherApi;
};

export const parseWeatherData = (data) => {
  console.log(data);
  const main = data.main;
  const temperature = main && main.temp;
  console.log(Math.ceil(temperature));
  return Math.ceil(temperature);
};
