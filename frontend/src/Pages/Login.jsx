import React from "react";

import Template from "../components/cors/Auth/Template";

import loginImg from "../assets/Images/login.webp";

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond. "
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
  );
}

export default Login;

// import loginImg from "../assets/Images/login.webp";
// import Template from "../components/core/Auth/Template";

// import loginImg from "../assets/Images/login.webp";

// import Template from "../components/cors/Auth/Template";

// function Login() {
//   return (
//     <Template
//       title="Welcome Back"
//       description1="Build skills for today, tomorrow, and beyond."
//       description2="Education to future-proof your career."
//       image={loginImg}
//       formType="login"
//     />
//   );
// }

// export default Login;
