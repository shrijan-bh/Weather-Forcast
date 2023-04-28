import { ReactNode } from "react";
import "../styles/style.css";

import ApiData from "../types/ApiData.type";

interface ICardProps {
  apiData: ApiData | undefined;
  dateBuilder: ReactNode;
  item: ApiData;
  delOnClickFunction: (item: ApiData) => void;
}

const ReportBox = ({
  item,
  apiData,
  dateBuilder,
  delOnClickFunction,
}: ICardProps) => {
  return (
    <div>
      <div className="reportBox">
        <div className="locationBox">
          <div className="location">{apiData?.name}</div>
          <div className="date">{dateBuilder}</div>
        </div>
        <div className="weatherBox">
          <div className="weatherIcon">
            {apiData?.weather?.map((item, index) => (
              <img
                className="logoIcon"
                key={index}
                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              ></img>
            ))}
          </div>
          <div className="temp">{Math.round(apiData?.main?.temp ?? 0)}°C</div>
          <div className="weather">
            {apiData?.weather?.map((item, index) => (
              <p key={index}>{item?.description}</p>
            ))}
          </div>
        </div>
        <div className="deleteBox">
          <button
            type="button"
            className="deleteButton"
            onClick={() => delOnClickFunction(item)}
          >
            ❌
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportBox;
