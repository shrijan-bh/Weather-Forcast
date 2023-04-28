import { Helmet } from "react-helmet";
import "../styles/fulldetail.css";
// import FullDetailBox from "../component/FullDetailBox";

const FullDetail = () => {
  return (
    <>
      <Helmet>
        <title>Weather-Forcast</title>
      </Helmet>
      <div>
        <div className="wrap-container">
          <div className="mainContainer">
            <div className="homeContainer">
              Full detail of weather Here.
              {/* <FullDetailBox
                homeAddrData= {}
                 dateBuilder={dateBuilder(new Date())}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullDetail;
