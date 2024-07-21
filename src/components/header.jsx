import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [name, setName] = useState(localStorage.getItem("username"));
  const [photo, setPhoto] = useState(localStorage.getItem("photo"));
  const email = localStorage.getItem("email").split("@")[0];

  const navigate = useNavigate();

  const logout = () => {
    try {
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("photo");
      localStorage.removeItem("uid");
      navigate("/register");
    } catch (error) {
      console.log(error);
    }
  };

  const toProfile = () => {
    navigate(`/${email}`);
  }

  return (<>
    <div className="bg-purple-400 h-20 bg-opacity-80 flex justify-between items-center m-3 rounded-md shadow-md shadow-orange-50">
      <Link to="/" className="text-4xl cursor-pointer font-extrabold text-yellow-300 m-3">ProMA</Link>
      <div onClick={toProfile} className="flex justify-center items-center cursor-pointer">
        <img src={photo} alt="profile" className="rounded-full h-10 w-10 m-3" />
        <p className="text-lg text-white font-bold m-3">{name}</p>
        <FontAwesomeIcon icon={faSignOut} onClick={logout} className="text-white text-2xl cursor-pointer m-3" />
      </div>
    </div>
  </>
  );
}