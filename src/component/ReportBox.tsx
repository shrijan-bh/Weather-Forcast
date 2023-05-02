import { ReactNode } from "react";
import "../styles/style.css";
import React from "react";

import ApiData from "../types/ApiData.type";
import { Omit, BsPrefixProps } from "react-bootstrap/esm/helpers";
import Modal, { ModalProps } from "react-bootstrap/Modal";

interface ICardProps {
  apiData: ApiData | undefined;
  item: ApiData;
  delOnClickFunction: (item: ApiData) => void;
}

const ReportBox = ({ item, apiData, delOnClickFunction }: ICardProps) => {
  const [modalShow, setModalShow] = React.useState(false);

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
    <div>
      <div className="outerContainer">
        <div onClick={() => setModalShow(true)}>
          <div className="reportBox">
            <div className="locationBox">
              <div className="location">{apiData?.name}</div>

              <div className="date"> {dateBuilder(new Date())}</div>
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
                  <p key={index}>{item?.description}</p>
                ))}
              </div>
            </div>
          </div>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <style>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
              integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
              crossOrigin="anonymous"
            />
          </style>
        </div>
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
    </div>
  );
};

export default ReportBox;
