const weatherOptions = [
  {
    url: "../images/day/cloudy.svg",
    day: true,
    type: "cloudy",
  },
  {
    url: "../images/day/foggy.svg",
    day: true,
    type: "foggy",
  },
  {
    url: "../images/day/snowy.svg",
    day: true,
    type: "snowy",
  },
  {
    url: "../images/day/stormy.svg",
    day: true,
    type: "stormy",
  },
  {
    url: "../images/day/sunny.svg",
    day: true,
    type: "sunny",
  },
  {
    url: "../images/night/cloudynight.svg",
    day: false,
    type: "cloud",
  },
  {
    url: "../images/night/foggynight.svg",
    day: false,
    type: "fog",
  },
  {
    url: "../images/night/night.svg",
    day: false,
    type: "night",
  },
  {
    url: "../images/night/snowynight.svg",
    day: false,
    type: "snow",
  },
  {
    url: "../images/night/stormynight.svg",
    day: false,
    type: "storm",
  },
];

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  console.log("weather card");
  const imageSrc = weatherOptions.filter((i) => {
    console.log(i);
    return i.day === day && i.type === type;
  });
  console.log(imageSrc);
  console.log(imageSrc[0].url);
  const imageSrcUrl = imageSrc[0].url || "";
  return (
    <section className="weather" id="weather">
      <div className="weather_info">{weatherTemp} F</div>
      <img
        src={imageSrcUrl}
        className="weather__image"
        alt="weather condition"
      />
    </section>
  );
};

export default WeatherCard;
