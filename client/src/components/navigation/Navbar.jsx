import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import  decode  from "jwt-decode";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Logo from "../../assets/red-rose-g8e69784c4_640.jpg";


const Navbar = ({ isTopOfPage }) => {
  const navbarBg = isTopOfPage ? "" : "bg-primary-500 drop-shadow";

  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogOut();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token]);

  return (
    <nav className="">
      <div className={`${navbarBg}   fixed top-0 z-30 w-full `}>
        <div className="flex w-5/6 mx-auto justify-between py-4 gap-8 ">
          {/* title */}
          <Link to="/">
            <div className="hover:cursor-pointer">
              <h1 className="text-xl font-semibold flex items-center gap-2">
                <img
                  src={Logo}
                  className="h-[50px] object-fill rounded-full w-[50px]"
                  alt=""
                />
                <span className="text-primary-100"> Memories</span>
              </h1>
            </div>
          </Link>

          {/* links */}
          <div className="hidden md:flex justify-between gap-10 items-center">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <img
                    src={user.result.imageUrl}
                    className="h-[30px] w-[30px] rounded-full object-fill"
                    alt=""
                  />
                  <p className="text-secondary-500 font-semibold">
                    {user.result.name}
                  </p>
                </div>
                <button className="bg-secondary-100" onClick={handleLogOut}>
                  Log Out
                </button>
              </>
            ) : (
              <div>
                <Link to={"/auth"}>
                  <button className="  ">Sign in</button>
                </Link>
              </div>
            )}
          </div>

          {/* open button */}
          <div className="md:hidden hover:cursor-pointer">
            <AiOutlineMenu
              className=" text-primary-100"
              size={35}
              onClick={() => setIsMenuToggled(true)}
            />
          </div>
        </div>
      </div>

      {/* mobile devices */}

      {isMenuToggled ? (
        <div className="fixed right-0 bottom-0 z-40 h-full  flex  flex-col gap-10  w-[300px] bg-primary-500 drop-shadow-xl lg:hidden">
          {/* closing button */}

          <div
            className="pt-20  mx-auto hover:cursor-pointer"
            onClick={() => setIsMenuToggled(!isMenuToggled)}
          >
            <h2 className="text-primary-100">
              <AiOutlineClose size={35} />
            </h2>
          </div>
          {/* menu */}
          <div className=" text-xl w-5/6 mx-auto text-center mt-[20%] flex  flex-col gap-10">
            {user ? (
              <>
                <div>
                  <p className="">USER</p>
                </div>
                <button>Log Out</button>
              </>
            ) : (
              <div>
                <Link to={"/auth"}>
                  <button className="  ">Sign in</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
