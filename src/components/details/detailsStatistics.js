import {
  FaTrademark,
  FaHashtag,
  FaDollarSign,
  FaPercent,
  FaExchangeAlt,
  FaRegClock,
  FaCommentsDollar,
  FaMoneyCheckAlt,
} from "react-icons/fa";

export const detailsStatistics = (data) => {
  const price = parseFloat(data.price).toFixed(2);
  const change = parseFloat(data.change);
  const volume = (parseFloat(data["24hVolume"]) / 1000000).toFixed(2);
  const cap = (parseFloat(data.marketCap) / 1000000).toFixed(2);

  return (
    <>
      <p>Stats</p>
      <p>
        <FaTrademark />
        {`Symbol= ${data.symbol}`}
      </p>
      <p>
        <FaHashtag />
        {`Rank= ${data.rank}`}
      </p>
      <p>
        <FaDollarSign />
        {`Price= ${price} $`}
      </p>
      <p>
        <FaPercent />
        Change={" "}
        <span className={`Details_change ${change < 0 ? "negative" : ""}`}>
          {change} %
        </span>{" "}
      </p>
      <p>
        <FaRegClock />
        {`24h Volume= ${volume} million $`}
      </p>
      <p>
        <FaMoneyCheckAlt />
        {`Market Cap= ${cap} million $`}
      </p>
      <p>
        <FaExchangeAlt />
        {`Exchanges= ${data.numberOfExchanges}`}
      </p>
      <p>
        <FaCommentsDollar />
        {`Markets= ${data.numberOfMarkets}`}
      </p>
    </>
  );
};
