import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./myList.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";

import { AuthContext } from "../../authContext/AuthContext";
import PopularList from "../../components/popularList/PopularList";

const MyList = ({ type }) => {
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

    getData("Your Favorites", `https://api.themoviedb.org/3/movie/now_playing`);

    getData("Continue Waching", `https://api.themoviedb.org/3/tv/airing_today`);

    getData("Rewatch", `https://api.themoviedb.org/3/movie/popular`);

    getData(
      "Recommended for you",
      `https://api.themoviedb.org/3/movie/popular`
    );
  }, []);

  return (
    <div className="list-container">
      <Navbar />
      <h2 className="title">My List</h2>
      {lists?.map((list) => (
        <PopularList list={list} key={list?.title} />
      ))}
    </div>
  );
};

export default MyList;
