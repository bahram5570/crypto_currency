import "./SlidingNews.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { coinsAsync } from "../redux/coinsSlice";

const SlidingNews = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(coinsAsync(10));
  }, [dispatch]);

  const [searchParams] = useSearchParams();
  const darkMode = searchParams.get("darkMode") === "true" ? true : false;

  const coinsData = useSelector((x) => x.coinsSlice);

  const list = [];
  !coinsData.loading &&
    !coinsData.isError &&
    coinsData.data.coins &&
    coinsData.data.coins.map((x) => list.push(x));
  list.push(...list);
  let listKey = 0;

  return (
    <div className={`SlidingNews`}>
      {!coinsData.loading &&
        !coinsData.isError &&
        list.map((x) => (
          <div
            className={`SlidingNews_container ${darkMode ? "" : "light"}`}
            key={listKey++}
          >
            <div>
              <p>{x.symbol}</p>
              <p
                className={`SlidingNews_change ${
                  parseFloat(x.change) < 0 ? "negative" : ""
                }`}
              >
                {x.change} %
              </p>
              <p>{parseFloat(x.price).toFixed(2)} $</p>
            </div>
            <div>
              <img src={x.iconUrl} alt={x.symbol} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default SlidingNews;
