import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";

import { AuthContext } from "../../authContext/AuthContext";
import PopularList from "../../components/popularList/PopularList";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [genreList, setGenreList] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!type) return;

    const getGenre = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/genre/${type}/list`,
          {
            params: {
              api_key: "428cdad8a337a25ea6adb3d2ea587a07",
              language: "en-US",
            },
          }
        );
        setGenreList(res.data.genres);
      } catch (error) {
        console.log(error);
      }
    };

    getGenre();
  }, [type]);

  useEffect(() => {
    const getData = async () => {
      let url = "https://api.themoviedb.org/3/trending/all/week";

      if (type === "movie") {
        url = "https://api.themoviedb.org/3/discover/movie";
      } else if (type === "series") {
        url = `https://api.themoviedb.org/3/discover/tv`;
      }

      const fetchData = async (title, pageIndex) => {
        try {
          const res = await axios.get(url, {
            params: {
              api_key: "428cdad8a337a25ea6adb3d2ea587a07",
              language: "en-US",
              page: pageIndex,
              with_genres: genre,
            },
          });

          return { title: title, content: res.data.results };
        } catch (error) {
          console.log(error);
        }
      };

      const lists = await Promise.all([
        fetchData("Trending Now: Hot Picks for You", 1),
        fetchData("Genre Spotlight: Dive into Your Favorite Category", 2),
        fetchData("Hidden Gems: Discover Unseen Treasures", 3),
        fetchData("Rewatch Classics: Timeless Favorites", 4),
        fetchData("Critics' Picks: Top-Rated Entertainment", 5),
        fetchData("International Hits: Explore Global Entertainment", 6),
      ]);

      setLists(lists);
    };

    getData();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured
        type={type}
        genre={genre}
        setGenre={setGenre}
        genreList={genreList}
      />
      {lists.map((list) => (
        <PopularList list={list} key={list?.title} />
      ))}
    </div>
  );
};

export default Home;
