import "./Details.css";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="Details">
      {!isError && loading && <Spinner />}
      {!loading && !isError && (
        <div className="Details_body">
          <FaTimesCircle className="Details_close" onClick={closeHandler} />
          <div className="Details_header">
            <p>{`${data.name} Statistics & Descriptions`}</p>
          </div>
          <div className="Details_stastics">
            <div>{detailsStatistics(data)}</div>
            <div>
              <img src={props.coinIcon} alt={props.coinIcon} />
            </div>
          </div>
          <div className="Details_description">
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
