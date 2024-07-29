import "./popularListItem.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PopularListItem({ index, item: movie }) {
  const [isHovered, setIsHovered] = useState(false);

  const trailer = "https://www.youtube.com/watch?v=IEEbUzffzrk";

  return (
    // <Link to={{ pathname: "/watch", movie: movie }}>
    <Link
      to="/watch"
      state={{
        movie: movie?.id,
        isSeries: movie?.first_air_date ? true : false,
      }}
    >
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={
            movie?.img ||
            `https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path}` ||
            "https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
          }
          alt=""
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1643208589889-0735ad7218f0?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
          }}
        />
        {isHovered && (
          <>
            {/* <video src={movie.trailer || trailer} autoPlay={true} loop /> */}
            <div className="itemInfo">
              <div className="icons">
                <PlayArrowIcon className="icon" />
                <AddIcon className="icon" />
                <ThumbUpAltOutlinedIcon className="icon" />
                <ThumbDownAltOutlinedIcon className="icon" />
              </div>
              <span style={{ fontSize: "14px", marginBottom: "5px" }}>
                {movie?.title || movie?.name || "Movie"}
              </span>
              <div className="itemInfoTop">
                <span>{movie?.duration || "1 hour 14 mins"}</span>
                <span className="limit">+{movie?.limit || 16}</span>
                <span>
                  {movie?.release_date?.split("-")[0] ||
                    movie?.first_air_date?.split("-")[0] ||
                    1999}
                </span>
              </div>
              <div className="desc">
                {movie?.overview?.length < 100
                  ? movie?.overview
                  : movie?.overview?.slice(0, 100) + "..."}
              </div>
              <div className="genre">{movie?.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
