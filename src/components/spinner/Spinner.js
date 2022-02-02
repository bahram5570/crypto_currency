import "./Spinner.css";
import { useSearchParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  const [searchParams] = useSearchParams();
  const darkMode = searchParams.get("darkMode") === "true" ? true : false;

  return (
    <div className={`Spinner ${darkMode ? "" : "light"}`}>
      <FaSpinner />
    </div>
  );
};

export default Spinner;
