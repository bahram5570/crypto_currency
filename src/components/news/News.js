import "./News.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { newsAsync } from "../redux/newsSlice";
import Spinner from "../spinner/Spinner";
import Arrow from "../arrow/Arrow";
import { FaImage } from "react-icons/fa";

const News = () => {
  const newsData = useSelector((x) => x.newsSlice);
  const loading = newsData.loading;
  const isError = newsData.isError;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(newsAsync());
  }, [dispatch]);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(newsData.data);
  }, [newsData.data]);

  const searchHandler = (e) => {
    const currentData = [...newsData.data];
    const updated = currentData.filter((x) =>
      x.description.toLowerCase().includes(e.target.value.toLowerCase().trim())
    );
    setFilteredData(updated);
  };

  const [searchParams] = useSearchParams();
  const darkMode = searchParams.get("darkMode") === "true" ? true : false;

  if (!loading && isError) {
    return (
      <div className="News">
        <p className={`News_message ${darkMode ? "" : "light"}`}>
          Could't fetch the data. Try again!
        </p>
      </div>
    );
  }

  return (
    <div className="News">
      <Arrow />
      {loading && <Spinner />}
      {!loading && !isError && (
        <div className={`News_header ${darkMode ? "" : "light"}`}>
          <h2>
            Latest News
          </h2>
          <input
            type="text"
            placeholder="Search for article"
            onChange={searchHandler}
          />
        </div>
      )}

      <div className={`News_items ${darkMode ? "" : "light"}`}>
        {!loading &&
          !isError &&
          filteredData.length > 0 &&
          filteredData.map((x) => (
            <section key={x.title}>
              <div className="News_header">
                <p>{x.title}</p>
                {x.tags[0].icon ? (
                  <img src={x.tags[0].icon} alt={x.title} />
                ) : (
                  <FaImage />
                )}
              </div>
              <div className="News_desc">
                <p>{x.description}</p>
              </div>
              <div className="News_source">
                <div>
                  <a href={x.link} target={"_blank"} rel="noopener noreferrer">
                    {x.tags[0].name}
                  </a>
                </div>
                <div>
                  <p>{x.date}</p>
                </div>
              </div>
            </section>
          ))}
      </div>
    </div>
  );
};

export default News;
