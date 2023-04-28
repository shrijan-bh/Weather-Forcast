import "../styles/fulldetail.css";
import { ReactNode } from "react";
import ApiData from "../types/ApiData.type";

interface ICardProps {
  homeAddrData: ApiData | undefined;
  dateBuilder: ReactNode;
}
const FullDetailBox = ({ homeAddrData, dateBuilder }: ICardProps) => {
  return (
    <div>
      <div className="reportBox">
        <div className="locationBox">
          <div className="location">{homeAddrData?.name}</div>
          <div className="countryLocation">,{homeAddrData?.sys.country}</div>
          <div className="date">{dateBuilder}</div>
        </div>
        <div className="coordinateBox">
          <div className="latitiudeBox">{homeAddrData?.coord.lat}°</div>
          <div className="longitudeBox">{homeAddrData?.coord.lon}°</div>
        </div>
        <div className="weatherBox">
          <div className="weatherIcon">
            {homeAddrData?.weather?.map((item, index) => (
              <img
                className="logoIconHome"
                key={index}
                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              ></img>
            ))}
          </div>
          <div className="TemperatureFactor">
            <div className="temp">
              {Math.round(homeAddrData?.main?.temp ?? 0)}°C
            </div>
            <div className="feelLike">
              {Math.round(homeAddrData?.main?.feels_like ?? 0)}°C
            </div>
            <div className="minTemp">
              {Math.round(homeAddrData?.main.temp_min ?? 0)}°C
            </div>
            <div className="maxTemp">
              {Math.round(homeAddrData?.main.temp_max ?? 0)}°C
            </div>
            <div className="pressure">{homeAddrData?.main.pressure}hPa</div>
            <div className="humidity">{homeAddrData?.main.humidity}%</div>
          </div>
          <div className="windFactor">
            <div className="windSpeed">{homeAddrData?.wind.speed}</div>
            <div className="winddegree">{homeAddrData?.wind.deg}</div>
          </div>
          <div className="weather">
            {homeAddrData?.weather?.map((item, index) => (
              <p key={index}>{item?.description}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullDetailBox;
