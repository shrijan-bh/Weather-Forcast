import { ReactNode } from "react";
import ApiData from "../types/ApiData.type";

interface ICardProps {
  item: ApiData;
  homeAddrData: ApiData;
  dateBuilder: ReactNode;
}

const ReportBox = ({ homeAddrData, dateBuilder }: ICardProps) => {
  return (
    <div>
      <div className="reportBox">
        <div className="locationBox">
          <div className="location">{homeAddrData?.name}</div>
          <div className="date">{dateBuilder}</div>
        </div>
        <div className="weatherBox">
          <div className="weatherIcon">
            {homeAddrData?.weather?.map((item, index) => (
              <img
                className="logoIcon"
                key={index}
                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              ></img>
            ))}
          </div>
          <div className="temp">
            {Math.round(homeAddrData?.main?.temp ?? 0)}°C
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

export default ReportBox;
