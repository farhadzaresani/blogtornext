import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../reducers/userReducer";
import styles from "./Navbar.module.css";
import { ProfileCircle, Logout, HambergerMenu } from "iconsax-react";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter().pathname;
  const route = useRouter();
  const [isLogedIn, setIsLogedIn] = useState(false);
  // const thisUser = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  // console.log(thisUser);
  const SignOut = () => {
    deleteCookie("ut");
    route.push("/");
    setOpen(!open);
  };
  useEffect(() => {
    const auth = hasCookie("ut");
    if (auth) {
      setIsLogedIn(true);
    }
  }, []);

  return (
    <>
      {/* <div className={`${styles.navbarSm}`}> */}
      {/* <div className=" flex justify-center items-center">
          <p
            className="flex uppencase font-bold text-cream"
            onClick={() => setOpenMenu(!openMenu)}
          >
            Menu
            <HambergerMenu size="24" />
          </p>
        </div> */}
      {/* </div> */}
      <div
        className={` ${styles.navbar} 
     
         `}
      >
        <div className="flex justify-center gap-2 md:justify-between w-full">
          <div className={styles.navBase}>
            <Link
              className={`${styles.navItem} ${
                router === "/" ? "md:opacity-60" : null
              } `}
              href="/"
            >
              Home
            </Link>
            <Link
              className={`${styles.navItem} ${
                router === "/Blogs" ? "md:opacity-60" : null
              } `}
              href="/Blogs"
            >
              Blogs
            </Link>
            <Link
              className={`${styles.navItem} ${
                router === "/Writers" ? "md:opacity-60" : null
              } `}
              href="/Writers"
            >
              Writers
            </Link>
          </div>
          {isLogedIn ? (
            <>
              <div
                onClick={() => setOpen(!open)}
                className={`${styles.navItem}    cursor-pointer `}
              >
                <ProfileCircle size="32" color="black" variant="Bold" />
              </div>
              {/* <div className="flex px-4 font-bold cursor-pointer text-charocoal   md:hidden ">
                SignOut <Logout size="22" variant="Bold" />
              </div> */}
            </>
          ) : (
            <Link
              className={`${styles.navItem} ${
                router === "/LoginSignUp" ? "md:opacity-60" : null
              } md:right-2 md:absolute `}
              href="/LoginSignUp"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div className=" overflow-hidden  fixed z-10 right-0 md:right-6 bottom-20 md:bottom-0 md:mb-0 mb-2  ">
        <div
          className={`bg-tan/40   ${
            open
              ? "md:-translate-y-0 translate-y-0"
              : " md:-translate-y-20 translate-y-20"
          }    md:${
            styles.tooltip
          } text-charocoal  p-4 transition-all duration-300 `}
        >
          <Link
            className={`w-full  font-bold px-6 `}
            href="/dashboard/profile"
            onClick={() => setOpen(!open)}
          >
            Profile
          </Link>

          <div
            onClick={() => SignOut()}
            className="flex cursor-pointer px-4 font-bold"
          >
            SignOut <Logout size="22" variant="Bold" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
