import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [a, aaa] = useState("");

  // useEffect(async () => {
  //   try {
  //     const response = await axios({
  //       method: "get",
  //       url: "https://coinranking1.p.rapidapi.com/coins",
  //       params: {
  //         referenceCurrencyUuid: "yhjMzLPhuIDl",
  //         timePeriod: "24h",
  //         tiers: "1",
  //         orderBy: "marketCap",
  //         orderDirection: "desc",
  //         limit: "50",
  //         offset: "0",
  //       },
  //       headers: {
  //         "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  //         "x-rapidapi-key":
  //           "e5d3f6fec5mshf354b8b7225d159p1cbd23jsn2a64234d5c2f",
  //       },
  //     });
  //     aaa(response.data.data.coins[0].price);
      
  //   } catch (error) {
  //     aaa("Error.................");
  //   }
  // }, []);


  return (
    <div>
      axios
      <h1>{a}</h1>
    </div>
  );
}

export default App;
