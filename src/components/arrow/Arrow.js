import "./Arrow.css";
import { animateScroll } from "react-scroll";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { useEffect, useState } from "react";

const Arrow = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scrollFunction = () => {
      const position = window.pageYOffset;
      if (position > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const getPosition = () => {
      window.addEventListener("scroll", scrollFunction);
    };

    getPosition();

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  });

  return (
    <FaArrowAltCircleUp
      className={`Arrow ${scrolled ? "" : "hidden"}`}
      onClick={() => {
        animateScroll.scrollToTop();
      }}
    />
  );
};

export default Arrow;
