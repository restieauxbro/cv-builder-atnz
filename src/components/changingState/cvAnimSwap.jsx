import { useEffect } from "react";
import { useState } from "react";
import CvUi from "../cv-ui";
import LoaderPage from "./loader";
//import '../../styles/components/loader.scss'

const CvAnimSwap = () => {
  const [loaded, setLoaded] = useState(false);

  function swapWithTimeout() {
    setTimeout(function () {
      setLoaded(true);
    }, 1000);
  }

  useEffect(() => {
    swapWithTimeout();
  }, []);

  return <>{loaded ? <CvUi /> : <LoaderPage />}</>;
};

export default CvAnimSwap;
