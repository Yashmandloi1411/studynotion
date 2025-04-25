import React from "react";
import { Link, matchPath } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";

import { NavbarLinks } from "../../data/navbar-links";

import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { setToken } from "../../slices/authSlice";
import { CiShoppingCart } from "react-icons/ci";

import ProfileDropDown from "../cors/Auth/ProfileDropDown";

import { apiConnector } from "../../services/apiconnector";

import { categories } from "../../services/apis";

import { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function Navbar() {
  // slice  me sa data fetch :useSelector
  const { token } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);

  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("printing subLink result:", result);
      setSubLinks(result.data.data);
    } catch (err) {
      console.log("could not fetch the category list");
    }
  };
  useEffect(() => {
    fetchSublinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location?.pathname);
  };

  return (
    <div className="mt-2 mx-2 flex items-center justify-around">
      <div className="w-[30%]">
        {/* image  */}
        <Link to="\">
          <img src={Logo} alt="" width={160} height={42} />
        </Link>
      </div>
      <div className="w-[50%] items-center justify-center">
        {/* Nav links */}
        <nav className="">
          <ul className=" flex text-white gap-x-6">
            {NavbarLinks.map((link, index) => (
              <li className="" key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-2 group cursor-pointer">
                    <p>{link.title}</p>
                    <MdKeyboardArrowDown />

                    <div
                      className="invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[50%] flex flex-col rounded-md bg-[#F1F2FF] p-4 text-[#585D69]
                     opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]"
                    ></div>

                    <div className="absolute left-[50%] top-3 h-6 w-6  translate-x-[80%] translate-y-[-45%] rotate-45 rounded bg-[#F1F2FF]"></div>

                    {subLinks.length ? (
                      subLinks.map((subLink, index) => (
                        <Link to={`${subLink.link}`} key={index}>
                          <p>{subLink.title}</p>
                        </Link>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={`${
                        matchRoute(link?.path) ? "text-[#FFE83D]" : "text-white"
                      }`}
                    >
                      {" "}
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="w-[20%]">
        {/* Login/Signup/Dashboard */}
        {user && user?.accountType !== "Instructor" && (
          <Link to="/dashboard/cart" className="relative">
            <CiShoppingCart />
            {totalItems > 0 && (
              <span className="absolute bg-richblue-300">{totalItems}</span>
            )}
          </Link>
        )}

        {/* Show Login & Signup only if there is no token */}
        {token === null && (
          <div className="flex ">
            <Link to="/login">
              <button className="ml-10 mr-3 border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-[#AFB2BF] rounded-md ">
                Log In
              </button>
            </Link>

            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-[#AFB2BF] rounded-md">
                Sign Up
              </button>
            </Link>
          </div>
        )}

        {/* Show Profile Dropdown when logged in */}
        {token !== null && <ProfileDropDown />}
      </div>
    </div>
  );
}

export default Navbar;

// return (
//   <div className=" flex h-14  border-b-[#2C333F] ">
//     <div className=" flex items-center  justify-around  ">
//       {/* image  */}
//       <Link to="\">
//         <img src={Logo} alt="" width={160} height={42} />
//       </Link>

//       <div className=" flex  items-center  justify-center  ">
//         {/* Nav links */}
//         <nav className="">
//           <ul className=" flex text-white gap-x-6">
//             {NavbarLinks.map((link, index) => (
//               <li className="" key={index}>
//                 {link.title === "Catalog" ? (
//                   <div></div>
//                 ) : (
//                   <Link to={link.path}>
//                     <p
//                       className={`${
//                         matchRoute(link?.path)
//                           ? "text-[#FFE83D]"
//                           : "text-white"
//                       }`}
//                     >
//                       {" "}
//                       {link.title}
//                     </p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Login/Signup/Dashboard */}
//         <div className="flex gap-x-4 items-end">
//           {user && user?.accountType !== "Instructor" && (
//             <Link to="/dashboard/cart" className="relative">
//               <CiShoppingCart />
//               {totalItems > 0 && (
//                 <span className="absolute bg-richblue-300">{totalItems}</span>
//               )}
//             </Link>
//           )}

//           {/* Show Login & Signup only if there is no token */}
//           {token === null && (
//             <div className="flex ">
//               <Link to="/login">
//                 <button className="ml-10 mr-3 border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-[#AFB2BF] rounded-md ">
//                   Log In
//                 </button>
//               </Link>

//               <Link to="/signup">
//                 <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-[#AFB2BF] rounded-md">
//                   Sign Up
//                 </button>
//               </Link>
//             </div>
//           )}

//           {/* Show Profile Dropdown when logged in */}
//           {token !== null && <ProfileDropDown />}
//         </div>
//       </div>
//     </div>
//   </div>
// );
