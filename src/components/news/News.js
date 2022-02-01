import "./News.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newsAsync } from "../redux/newsSlice";
import Spinner from "../spinner/Spinner";
import { FaImage } from "react-icons/fa";

const News = () => {
  const newsData = useSelector((x) => x.newsSlice);
  const loading = newsData.loading;
  const isError = newsData.isError;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(newsAsync());
  }, [dispatch]);

  if (!loading && isError) {
    return (
      <div className="News">
        <p className="News_message">Could't fetch the data. Try again!</p>
      </div>
    );
  }

  return (
    <div className="News">
      {loading && <Spinner />}
      {!loading && !isError && <h2>Latest News</h2>}

      <div className="News_items">
        {!loading &&
          !isError &&
          newsData.data.length > 0 &&
          newsData.data.map((x) => (
            <section key={x.name}>
              <div className="News_header">
                <p>{x.name}</p>
                {x.image ? (
                  <img src={x.image.thumbnail.contentUrl} alt={x.name} />
                ) : (
                  <FaImage />
                )}
              </div>
              <div className="News_desc">
                <p>{x.description}</p>
              </div>
              <div className="News_source">
                <div>
                  <a href={x.url} target={"_blank"} rel="noopener noreferrer">
                    {x.provider[0].name}
                  </a>
                  {x.provider ? (
                    <img
                      src={x.provider[0].image.thumbnail.contentUrl}
                      alt={x.name}
                    />
                  ) : (
                    <FaImage />
                  )}
                </div>
                <div>
                  <p>{new Date(x.datePublished).toDateString()}</p>
                </div>
              </div>
            </section>
          ))}
      </div>
    </div>
  );
};

export default News;