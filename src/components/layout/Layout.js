import "./Layout.css";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { coinsAsync } from "../redux/coinsSlice";
import { newsAsync } from "../redux/newsSlice";
import navBarIcon from "./icon.png";
import { FaBars, FaSyncAlt } from "react-icons/fa";

const Layout = (props) => {
  const [sideBar, setSideBar] = useState(false);

  const location = useLocation();

  const dispatch = useDispatch();

  const refreshHandler = () => {
    if (location.pathname === "/Coins") {
      dispatch(coinsAsync(10));
    } else if (location.pathname === "/News") {
      dispatch(newsAsync());
    }
  };

  return (
    <main className="Layout">
      <header className={sideBar ? "open" : ""}>
        <nav>
          <img src={navBarIcon} alt="Main Icon" />
          <span className="Layout_refresh" onClick={refreshHandler}>
            <p>Refresh</p>
            <FaSyncAlt />
          </span>
        </nav>
        <nav className="Layout_pages">
          <FaBars
            className={`Layout_menu ${sideBar ? "open" : ""}`}
            onClick={() => setSideBar(!sideBar)}
          />
          <ul className={`Layout_sidebar ${sideBar ? "open" : ""}`}>
            <li>
              <NavLink
                to="/Coins"
                className={(x) => (x.isActive ? "selected" : "")}
              >
                Coins
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/News"
                className={(x) => (x.isActive ? "selected" : "")}
              >
                News
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {props.children}

      <footer>
        <nav>
          <ul>
            <p>Powered by: </p>
            <li>
              <a
                href="https://reactjs.org"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                React
              </a>
            </li>
            <li>
              <a
                href="https://redux.js.org"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                Redux
              </a>
            </li>
            <li>
              <a
                href="https://rapidapi.com"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                RapidAPI
              </a>
            </li>
            <li>
              <a
                href="https://fontawesome.com"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                Font Awesome
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </main>
  );
};

export default Layout;
