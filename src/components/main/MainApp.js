import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CoinsPage from "../pages/CoinsPage";
import NewsPage from "../pages/NewsPage";

const MainApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"Coins"} />} />
          <Route path="/Coins" element={<CoinsPage />} />
          <Route path="/News" element={<NewsPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default MainApp;
