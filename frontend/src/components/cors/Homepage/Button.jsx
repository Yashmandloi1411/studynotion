import React from "react";
import { Link } from "react-router-dom";

function Button({ children, active, linkto }) {
  return (
    <Link to={linkto}>
      <div
        className={`text-center  rounded-md p-3 mt-3
      ${active ? "bg-yellow-300 text-black" : "bg-[#161D29] text-white"}
        hover:scale-95 transition-all duration-200
      `}
      >
        {children}
      </div>
    </Link>
  );
}

export default Button;
