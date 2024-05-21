import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const Links = (
    <>
      <li className="hover:text-[#297045] ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border-b-4 bg-transparent  border-[#297045] text-[#297045] font-bold "
              : ""
          }
          to="/"
        >
          হোম
        </NavLink>
      </li>
    </>
  );
  return (
    <div className={`fixed top-0 right-0 left-0  bg-base-100 z-50 ${
      scrolled
        ? "transition delay-100  backdrop-blur-sm bg-white/70 border-b rounded-b-2xl border-opacity-30 border-[#74C138]"
        : "bg-transparent"
    }`}>
      <div className=" container mx-auto navbar ">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {Links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost p-0 text-xl">
            <img
              src="../src/assets/images/porbo_logo_b.png"
              alt=""
              className="h-10"
            />
            <h1 className="text-3xl">
              Porbo <span className="text-[#297045]">Shobai</span>
            </h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{Links}</ul>
        </div>
        <div className="navbar-end">
          <Link
            to="/login"
            className="btn hidden md:flex bg-[#297045]  text-white font-poppins rounded-xl min-h-0 h-10 md:min-h-[3rem] md:h-[3rem]"
          >
            লগ ইন / সাইন আপ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
