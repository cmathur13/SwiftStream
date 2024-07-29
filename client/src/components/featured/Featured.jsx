import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

import "./featured.scss";
import { useContext } from "react";

export default function Featured({ type, genre, setGenre, genreList }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getData = async (url) => {
      try {
        const page = Math.floor(Math.random() * 10) + 1;
        const res = await axios.get(
          "https://api.themoviedb.org/3/trending/all/day",
          {
            params: {
              api_key: "428cdad8a337a25ea6adb3d2ea587a07",
              language: "en-US",
              page: page,
            },
          }
        );
        setContent(res.data.results[Math.floor(Math.random() * 10) + 1]);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          >
            <option value="">Genre</option>
            {genreList.map((genreOption) => (
              <option
                key={genreOption?.id}
                value={genreOption?.id}
                selected={genreOption?.id == genre ? "selected" : ""}
              >
                {genreOption?.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <img
        src={
          content?.img ||
          `https://image.tmdb.org/t/p/w1280/${content?.backdrop_path}` ||
          "https://images.unsplash.com/photo-1643208589889-0735ad7218f0?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt=""
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1643208589889-0735ad7218f0?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        }}
      />
      <div className="info">
        {/* <img src={content.imgTitle} alt="" />
         */}
        <h1>{content?.title || content?.name}</h1>
        <span className="desc">{content?.overview}</span>
        <div className="buttons">
          <Link
            to="/watch"
            state={{
              movie: content?.id,
              isSeries: content?.first_air_date ? true : false,
            }}
            className="link"
          >
            <button className="play">
              <PlayArrowIcon />
              <span>Play</span>
            </button>
          </Link>
          <button className="more">
            <InfoOutlinedIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
