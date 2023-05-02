import { Helmet } from "react-helmet";
import { useState, useEffect, ReactNode } from "react";
import Modal, { ModalProps } from "react-bootstrap/Modal";
import React from "react";

import "../styles/style.css";
import ApiData from "../types/ApiData.type";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toastHook } from "../hooks/toastHook";
import ReportBox from "../component/ReportBox";
import HomeBox from "../component/HomeBox";
import { Omit, BsPrefixProps } from "react-bootstrap/esm/helpers";

const Home = () => {
  const [inputValue, setinputValue] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [apiData, setApiData] = useState<ApiData>();
  const [arrayData, setArrayData] = useState<ApiData[]>([]);
  const [homeAddrData, setHomeAddrData] = useState<ApiData>();
  const homeAddress = "Kathmandu";
  async function getWeatherData(inputValue: string) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=ce66f62e3e008767f84508de2dad259b&units=metric`;
    await fetch(api)
      .then((response) => response.json())
      .then((data: ApiData) => {
        if (data.cod === 200) {
          setApiData(data);

          if (arrayData.length < 3) {
            if (
              arrayData.find((e) => e.id === data.id) ??
              inputValue.toUpperCase() === homeAddress.toUpperCase()
            ) {
              setinputValue("");

              toastHook({
                message: "Repeated value",
                type: "warning",
              });
            } else {
              setArrayData((prev) => [...prev, data]);
              setinputValue("");
            }
          } else {
            setinputValue("");

            toastHook({
              message: "Maximum limit reached",
              type: "warning",
            });
          }
        } else {
          setinputValue("");

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

  const delOnClick = (item: ApiData) => {
    const answer = arrayData.includes(item);
    answer
      ? (setArrayData((current) => current.filter((ite) => ite !== item)),
        toastHook({
          message: "Sucessfully deleted",
          type: "success",
        }))
      : console.log("No data");
  };

  useEffect(() => {
    const defaultDataFetch = async () => {
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${homeAddress}&appid=ce66f62e3e008767f84508de2dad259b&units=metric`;
      await fetch(api)
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === 200) {
            setHomeAddrData(data);
            console.log("hit");
          } else {
            toastHook({
              message: "No city found",
              type: "warning",
            });
          }
        });
    };
    defaultDataFetch().catch((err) => console.log(err));
  }, []);
  function MyVerticallyCenteredModal(
    props: JSX.IntrinsicAttributes &
      Omit<
        Omit<
          React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
          >,
          "ref"
        > & {
          ref?:
            | ((instance: HTMLDivElement | null) => void)
            | React.RefObject<HTMLDivElement>
            | null
            | undefined;
        },
        BsPrefixProps<"div"> & ModalProps
      > &
      BsPrefixProps<"div"> &
      ModalProps & { children?: ReactNode }
  ) {
    return (
      <>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {apiData?.name},{apiData?.sys.country}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="date">{dateBuilder(new Date())}</div>
            <div className="coordinateBox">
              <div className="latitiudeBox">
                Latitude: {apiData?.coord.lat}°
              </div>
              <div className="longitudeBox">
                Longitude: {apiData?.coord.lon}°
              </div>
            </div>
            <div className="weatherBox">
              <div className="weatherIcon">
                {apiData?.weather?.map((item, index) => (
                  <img
                    className="logoIconHome"
                    key={index}
                    src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                  ></img>
                ))}
              </div>
              <div className="TemperatureFactor">
                <div className="temp">
                  {Math.round(apiData?.main?.temp ?? 0)}°C
                </div>
                <div className="feelLike">
                  Feels Like: {Math.round(apiData?.main?.feels_like ?? 0)}
                  °C
                </div>
                <br />
                <div className="minTemp">
                  Minimum Temperaure : {Math.round(apiData?.main.temp_min ?? 0)}
                  °C
                </div>
                <div className="maxTemp">
                  MAximum Temperature: {Math.round(apiData?.main.temp_max ?? 0)}
                  °C
                </div>
                <div className="pressure">
                  Pressure: {apiData?.main.pressure}hPa
                </div>
                <div className="humidity">
                  Humidity: {apiData?.main.humidity}%
                </div>
              </div>
              <div className="windFactor">
                <div className="windSpeed">
                  Wind Speed: {apiData?.wind.speed}
                </div>
                <div className="winddegree">
                  Wind Angle: {apiData?.wind.deg}°
                </div>
              </div>
              <div className="weather">
                {apiData?.weather?.map((item, index) => (
                  <p key={index}>{item?.description}</p>
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
  }
  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>Weather-Forcast</title>
      </Helmet>
      <div className="wrap-container">
        <div className="mainContainer">
          <div className="homeContainer">
            <div className="homeDataContainer">
              <p className="listHeadContainer">Home Address</p>

              <HomeBox
                homeAddrData={homeAddrData}
                dateBuilder={dateBuilder(new Date())}
              />
            </div>
            <div className="searchBar">
              <form className="formBox" onSubmit={inputOnSubmit}>
                <input
                  type="text"
                  value={inputValue}
                  className="inputBox"
                  placeholder="City name"
                  onChange={(e) => setinputValue(e.target.value)}
                ></input>
                <input type="submit" value="Add" className="submitBtn"></input>
              </form>
            </div>
            <hr />

            <div className="secondaryWeatherContainer">
              {arrayData?.map((item) => (
                <div onClick={() => setModalShow(true)}>
                  <ReportBox
                    item={item}
                    apiData={item}
                    dateBuilder={dateBuilder(new Date())}
                    delOnClickFunction={delOnClick}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
export default Home;
