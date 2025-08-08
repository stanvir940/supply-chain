import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  return (
    <div>
      <div className="navbar bg-green-800 mb-4 text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-transparent rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/"}>Home</Link>
              </li>

              <li>
                <Link to={"/buy_form"}>Buy</Link>
              </li>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 bg-transparent">
            <li>
              <Link to={"/"}>Home</Link>
            </li>

            <li>
              <Link to={"/buy_form"}>Buy</Link>
            </li>
            <li>
              <Link to={"/admin"}>Admin</Link>
            </li>
            <li>
              {user ? (
                <a onClick={logout}>Logout</a>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn btn-primary text-white">
            {" "}
            {/* {isLoggedIn ? (
              <Link onClick={"logout"}>Logout</Link>
            ) : (
              <Link to={"/login"}>Login</Link>
            )} */}
            <Link to={"/login"}>Profile</Link>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
