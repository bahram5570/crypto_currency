export const urlCoins = (number) => {
  return {
    method: "get",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      tiers: "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: number,
      offset: "0",
    },
    headers: {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": "e5d3f6fec5mshf354b8b7225d159p1cbd23jsn2a64234d5c2f",
    },
  };
};
