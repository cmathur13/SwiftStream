import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import "./navbar.scss";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <span>
            <Link to="/" className="link main">
              Homepage
            </Link>
          </span>
          <span>
            <Link to="/series" className="link main">
              Series
            </Link>
          </span>
          <span>
            <Link to="/movies" className="link main">
              Movies
            </Link>
          </span>
          <span className="link">
            <Link to="/popular" className="link main">
              New and Popular
            </Link>
          </span>
          <span className="link">
            <Link to="/list" className="link main">
              My List
            </Link>
          </span>
        </div>
        <div className="right">
          <SearchIcon className="icon" />
          <span>KID</span>
          <NotificationsNoneIcon className="icon" />
          <div className="rightmost">
            <div className="profile">
              <ArrowDropDownIcon className="icon" />
              <div className="options">
                <span>Settings</span>
                <span
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                  }}
                >
                  Logout
                </span>
              </div>
            </div>
            <img
              src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
