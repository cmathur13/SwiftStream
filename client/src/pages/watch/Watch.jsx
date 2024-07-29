import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  const movie = location.state.movie;
  const isSeries = location.state.isSeries;
  const [video, setVideo] = useState("");

  useEffect(() => {
    const getData = async (url) => {
      try {
        const res = await axios.get(url, {
          params: {
            api_key: "428cdad8a337a25ea6adb3d2ea587a07",
          },
        });
        setVideo(res?.data?.results?.[0]?.key);
      } catch (error) {
        console.log(error);
      }
    };

    if (!isSeries) {
      getData(`https://api.themoviedb.org/3/movie/${movie}/videos`);
    } else {
      getData(`https://api.themoviedb.org/3/tv/${movie}/videos`);
    }
  }, [movie, isSeries]);

  return (
    <div className="watch">
      <div className="back">
        <Link to="/" className="link">
          <ArrowBackIosOutlinedIcon />
          Home
        </Link>
      </div>
      {/* <video className="video" autoPlay progress controls src={movie.video} /> */}
      {/* <video className="video" autoPlay controls>
        <source src={movie.video} type="video/mp4" />
        Your browser does not support HTML video.
      </video> */}
      <iframe
        className="video"
        src={
          video
            ? `https://www.youtube.com/embed/${video}`
            : `https://www.youtube.com/embed/IEEbUzffzrk`
        }
        allowFullScreen
      ></iframe>
    </div>
  );
}
