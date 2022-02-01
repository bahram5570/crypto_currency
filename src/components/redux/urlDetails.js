export const urlDetails = (coinID) => {
  return {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${coinID}`,
    params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: "24h" },
    headers: {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": "e5d3f6fec5mshf354b8b7225d159p1cbd23jsn2a64234d5c2f",
    },
  };
};
