import "./Details.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import htmlParse from "html-react-parser";
import Spinner from "../spinner/Spinner";
import { detailsStatistics } from "./detailsStatistics";
import { detailsLinks } from "./detailsLinks";
import { FaTimesCircle } from "react-icons/fa";
import Chart from "./Chart";

const Details = (props) => {
  const { data, loading, isError } = props.detailsData;

  const navigate = useNavigate();

  const closeHandler = () => {
    navigate(-1);
    props.onClose();
  };

  const [searchParams] = useSearchParams();
  const darkMode = searchParams.get("darkMode") === "true" ? true : false;

  return (
    <div className="Details">
      {!isError && loading && <Spinner />}
      {!loading && isError && (
        <div className={`Details_body ${darkMode ? "" : "light"}`}>
          <FaTimesCircle className="Details_close" onClick={closeHandler} />
          <p className={`Details_message ${darkMode ? "" : "light"}`}>
            Could't fetch the data. Try again!
          </p>
        </div>
      )}

      {!loading && !isError && (
        <div className={`Details_body ${darkMode ? "" : "light"}`}>
          <FaTimesCircle className="Details_close" onClick={closeHandler} />
          <div className={`Details_header ${darkMode ? "" : "light"}`}>
            <p>{`${data.name} Statistics & Descriptions`}</p>
          </div>
          <div className={`Details_stastics ${darkMode ? "" : "light"}`}>
            <div>{detailsStatistics(data)}</div>
            <div>
              <img src={props.coinIcon} alt={props.coinIcon} />
            </div>
          </div>
          <div className={`Details_description ${darkMode ? "" : "light"}`}>
            <Chart data={data.sparkline} />
            <p>Descriptions</p>
            <div className="Details_columns">
              <div>{htmlParse(data.description)}</div>
              <div className="Details_links">
                <h3>Related Sites</h3>
                {detailsLinks(data.links)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
