import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import "../styles/style.css";
import ApiData from "../types/ApiData.type";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toastHook } from "../hooks/toastHook";

const Home = () => {
  const [inputValue, setinputValue] = useState("");
  const [apiData, setApiData] = useState<ApiData>();

  async function getWeatherData(inputValue: string) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=9271d8c0affbf4ee5e9f1b064e23a0c4&units=metric`;
    await fetch(api)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setApiData(data);
        } else {
          toastHook({
            message: "No city found",
            type: "warning",
          });
        }
      });
  }
  const inputOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getWeatherData(inputValue);
  };

  const dateBuilder = (d: Date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  useEffect(() => {
    if (!apiData) {
      return;
    }
  }, [apiData]);

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>Weather-Forcast</title>
      </Helmet>
      <div className="wrap-container">
        <div className="mainContainer">
          <form className="formBox" onSubmit={inputOnSubmit}>
            <input
              type="text"
              className="inputBox"
              placeholder="City name"
              onChange={(e) => setinputValue(e.target.value)}
            ></input>
            <input type="submit" value="Search" className="submitBtn"></input>
          </form>
          <p className="listHeadContainer">Weather Report</p>

          <div className="reportBox">
            <div className="locationBox">
              <div className="location">{apiData?.name}</div>
              <div className="date">{dateBuilder(new Date())}</div>
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
              <div className="temp">
                {Math.round(apiData?.main?.temp ?? 0)}°C
              </div>
              <div className="weather">
                {apiData?.weather?.map((item, index) => (
                  <p key={index}>{item?.main}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
