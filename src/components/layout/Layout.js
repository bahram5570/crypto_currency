import "./Layout.css";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { coinsAsync } from "../redux/coinsSlice";
import { newsAsync } from "../redux/newsSlice";
import navBarIcon from "./icon.png";
import { FaBars, FaSyncAlt, FaRegSun, FaRegMoon } from "react-icons/fa";

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

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = searchParams.get("darkMode");

  useEffect( () => {
    if (params === null) {
      navigate('?darkMode=true')
    }
  }, [params, navigate]);

  const darkModeHandler = () => {
    if (params === "true") {
      navigate("?darkMode=false")
    } else {
      navigate("?darkMode=true")
    }
  };

  const darkMode = params === "true" ? true : false;

  
  return (
    <main className={`Layout ${darkMode ? "" : "light"}`}>
      <header className={sideBar ? "open" : ""}>
        <nav>
          <img src={navBarIcon} alt="Main Icon" />
          <span className="Layout_refresh" onClick={refreshHandler}>
            <p>Refresh</p>
            <FaSyncAlt />
          </span>

          <span className={`Layout_darkMode ${darkMode ? "" : "light"}`} onClick={darkModeHandler}>
            <FaRegSun className="Layout_sun" />
            <FaRegMoon className="Layout_moon" />
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
                to={`/Coins?darkMode=${darkMode}`}
                className={(x) => (x.isActive ? "selected" : "")}
              >
                Coins
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/News?darkMode=${darkMode}`}
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
          </ul>
        </nav>
      </footer>
    </main>
  );
};

export default Layout;
