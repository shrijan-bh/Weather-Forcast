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
    <div className="outerContainer">
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
      </div>
      <style>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossOrigin="anonymous"
        />
      </style>
      <div className="deleteBox">
        <button
          type="button"
          className="deleteButton"
          onClick={() => delOnClickFunction(item)}
        >
          ❌
        </button>
      </div>{" "}
    </div>
  );
};

export default ReportBox;
