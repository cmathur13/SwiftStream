import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./popular.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";

import { AuthContext } from "../../authContext/AuthContext";
import PopularList from "../../components/popularList/PopularList";

const Popular = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const contentList = [];

    const getData = async (title, url) => {
      try {
        const res = await axios.get(url, {
          params: {
            api_key: "428cdad8a337a25ea6adb3d2ea587a07",
            language: "en-US",
            page: 1,
          },
        });
        contentList.push({ title: title, content: res.data.results });
        setLists(contentList);
      } catch (error) {
        console.log(error);
      }
    };

    getData(
      "Big Screen Thrills: Movies Now Playing",
      `https://api.themoviedb.org/3/movie/now_playing`
    );

    getData(
      "TV Premiere Extravaganza: Fresh Picks Today",
      `https://api.themoviedb.org/3/tv/airing_today`
    );

    getData(
      "Box Office Buzz: Most Popular Picks",
      `https://api.themoviedb.org/3/movie/popular`
    );

    getData(
      "TV Phenomenon: Most Popular Shows Revealed",
      `https://api.themoviedb.org/3/tv/popular`
    );
    getData(
      "Critical Acclaim: Top Rated Movie Magic",
      `https://api.themoviedb.org/3/movie/top_rated`
    );

    getData(
      "TV Excellence: Top Rated Shows Unleashed",
      `https://api.themoviedb.org/3/tv/top_rated`
    );

    getData(
      "Future Blockbusters: Upcoming Movie Madness",
      `https://api.themoviedb.org/3/movie/upcoming`
    );
  }, []);

  return (
    <div className="popular">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists?.map((list) => (
        <PopularList list={list} key={list?.title} />
      ))}
    </div>
  );
};

export default Popular;
