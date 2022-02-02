import "./NotFound.css";
import { useSearchParams } from "react-router-dom";


const NotFound = () => {
    const [searchParams] = useSearchParams();
    const darkMode = searchParams.get("darkMode") === "true" ? true : false;

    return ( 
        <div className={`NotFound ${darkMode ? "light" : ""}`}>
            <p>404</p>
            <p>Page Not Found!</p>
        </div>
     );
}
 
export default NotFound;