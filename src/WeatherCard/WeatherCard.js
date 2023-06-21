const weatherOptions = [
  {
    url: require("../images/day/cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  { url: require("../images/day/foggy.svg").default, day: true, type: "foggy" },
  { url: require("../images/day/snowy.svg").default, day: true, type: "snowy" },
  {
    url: require("../images/day/stormy.svg").default,
    day: true,
    type: "stormy",
  },
  { url: require("../images/day/sunny.svg").default, day: true, type: "sunny" },
  {
    url: require("../images/night/cloudynight.svg"),
    day: false,
    type: "cloud",
  },
  {
    url: require("../images/night/foggynight.svg").default,
    day: false,
    type: "fog",
  },
  {
    url: require("../images/night/night.svg").default,
    day: false,
    type: "night",
  },
  {
    url: require("../images/night/snowynight.svg").default,
    day: false,
    type: "snow",
  },
  {
    url: require("../images/night/stormynight.svg").default,
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
      <div className="weather_info">{weatherTemp}</div>
      <img src={imageSrcUrl} className="weather__image" />
    </section>
  );
};
export default WeatherCard;
