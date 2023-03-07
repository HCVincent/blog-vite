import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar sticky top-0 bg-red-500 h-1/7 z-50">
      <div className="container mx-auto flex justify-between items-center text-white max-w-full">
        <div className="logo">
          <Link to="/">HOME</Link>
        </div>
        <div className="links flex items-center gap-6">
          <Link className="link" to="/?cat=art">
            <h6 className="text-lg font-medium py-3 px-8 hover:bg-red-400">
              ART
            </h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6 className="text-lg font-medium py-3 px-8">SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6 className="text-lg font-medium py-3 px-8">TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6 className="text-lg font-medium py-3 px-8">CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6 className="text-lg font-medium py-3 px-8">DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6 className="text-lg font-medium py-3 px-8">FOOD</h6>
          </Link>
          <span className="font-medium">{currentUser?.username}</span>
          {currentUser ? (
            <span className="font-medium cursor-pointer" onClick={logout}>
              Logout
            </span>
          ) : (
            <Link className="link font-medium" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              <div className="flex justify-center space-x-2">
                <label
                  htmlFor="file"
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="inline-block rounded bg-green-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] hover:bg-green-400"
                >
                  Write
                </label>
              </div>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
