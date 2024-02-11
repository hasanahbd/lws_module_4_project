import { useContext } from "react";
import getImageUrl, { getIconUrl } from "../../utils/images";
import { WeatherContext } from "../../context";
import getFormattedDate from "../../utils/date-utils";
export default function WeatherHeadline() {
  const {weatherData}=useContext(WeatherContext);
  const {climate, temperature, location,time}=weatherData;
  const getWeatherIcon = (climate) => {
    switch (climate) {
      case "Cloud":
        return "cloud.svg";
      case "Rain":
        return "rainy.svg";
      case "Clear":
        return "sun.svg";
      case "Haze":
        return "haze.svg";
      default:
        return "sun.svg";
    
    }
  }
  return (
    <div>
      <div className="max-md:flex items-center justify-between md:-mt-10">
        <img src={getIconUrl(getWeatherIcon(climate))} alt="cloud" />
        <div className="max-md:flex items-center max-md:space-x-4">
          <h1 className="text-[60px] lg:text-[80px] xl:text-[100px] leading-none md:mb-4">
            {temperature}°
          </h1>
          <div className="flex items-center space-x-4 md:mb-4">
            <img src={getImageUrl("pin.svg")} />
            <h2 className="text-2xl lg:text-[50px]">{location}</h2>
          </div>
        </div>
      </div>
      <p className="text-sm lg:text-lg">{getFormattedDate(time,"time")} - {getFormattedDate(time)}</p>
    </div>
  );
}
