import "./Coins.css";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaCoins,
  FaExchangeAlt,
  FaCommentsDollar,
  FaRegClock,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { coinsAsync } from "../redux/coinsSlice";
import { detailsAsync } from "../redux/datailsSlice";
import Details from "../details/Details";
import Spinner from "../spinner/Spinner";

let coinIcon = "";

const Coins = () => {
  const coinsData = useSelector((x) => x.coinsSlice);
  const loading = coinsData.loading;
  const isError = coinsData.isError;
  const stats = coinsData.data.stats;

  const [showMore, setShowMore] = useState(false);

  const showMoreHandler = () => {
    dispatch(coinsAsync(50));
    setShowMore(true);
  };

  useEffect(() => {
    setFilteredData(coinsData.data.coins);
  }, [coinsData.data.coins]);

  const [filteredData, setFilteredData] = useState(null);

  const searchHandler = (e) => {
    const currentData = [...coinsData.data.coins];
    const updated = currentData.filter((x) =>
      x.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(updated);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(coinsAsync(10));
  }, [dispatch]);

  const [searchParams] = useSearchParams();
  const [showDetails, setShowDetails] = useState(false);
  const detailsData = useSelector((x) => x.detailsSlice);

  const closeDetailsHandler = () => {
    setShowDetails(false);
  };

  useEffect(() => {
    if (searchParams.get("coinID")) {
      dispatch(detailsAsync(searchParams.get("coinID")));
      setShowDetails(true);

      const currentList = [...filteredData];
      coinIcon = currentList.find((x) => x.uuid === searchParams.get("coinID"));
    }
  }, [dispatch, searchParams, filteredData]);

  if (!loading && isError) {
    return (
      <div className="Coins">
        <p className="Coins_message">Could't fetch the data. Try again!</p>
      </div>
    );
  }

  return (
    <div className="Coins">
      {showDetails && (
        <Details
          detailsData={detailsData}
          coinIcon={coinIcon.iconUrl}
          onClose={closeDetailsHandler}
        />
      )}
      {loading && <Spinner />}
      {!loading && !isError && filteredData && (
        <>
          <h2>Global Crypto Stats</h2>
          <div className="Coins_global">
            <section>
              <h4>
                <FaCoins />
                Total Coins:
              </h4>
              <p>{stats.totalCoins}</p>
            </section>
            <section>
              <h4>
                <FaExchangeAlt />
                Total Exchanges:
              </h4>
              <p>{stats.totalExchanges}</p>
            </section>
            <section>
              <h4>
                <FaCommentsDollar />
                Total Markets:
              </h4>
              <p>{stats.totalMarkets}</p>
            </section>
            <section>
              <h4>
                <FaRegClock />
                Daily Volume:
              </h4>
              <p>
                {(parseInt(stats.total24hVolume) / 1000000000).toFixed(1)} T$
              </p>
            </section>
          </div>

          <div className="Coins_showMore">
            {!showMore && <h2>Top 10 Crypto Currencies</h2>}
            {showMore && <h2>Crypto Currencies</h2>}
            {!showMore && <button onClick={showMoreHandler}>Show More</button>}
            {showMore && (
              <input
                type="text"
                placeholder="Search by name"
                onChange={searchHandler}
              />
            )}
          </div>
          <div className="Coins_items">
            {showMore && filteredData.length === 0 && (
              <p className="Coins_message">No match found!</p>
            )}
            {!loading &&
              !isError &&
              filteredData &&
              filteredData.map((x) => (
                <section key={x.uuid}>
                  <div>
                    <h4>{`${x.rank}. ${x.name}`}</h4>
                    <img src={x.iconUrl} alt={x.name} />
                  </div>
                  <p>Price: {parseFloat(x.price).toFixed(2)} $</p>
                  <p>Symbol: {x.symbol}</p>
                  <p>
                    Daily Change:{" "}
                    <span
                      className={`Coins_change ${
                        parseFloat(x.change) < 0 ? "negative" : ""
                      }`}
                    >
                      {x.change} %
                    </span>{" "}
                  </p>
                  <span className="Coins_details">
                    <Link to={`?coinID=${x.uuid}`}>Details</Link>
                  </span>
                </section>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Coins;
