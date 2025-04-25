import React from "react";
import CTAButton from "../Homepage/Button";
// import HighlighteText from "./HighlighteText";

import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  codeColor,
  backgroudGradient,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 `}>
      {/*Section 1*/}
      <div className="ml-4 w-[50%] flex flex-col gap-4 text-white">
        {heading}
        <div className=" text-gray-400  ">{subheading}</div>

        <div className="flex gap-7  mt-3 sm:mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/*Section 2 = Animation coding text*/}

      <div
        className="mr-4 p-3 flex  h-fit  w-[50%]  text-[10px]  border  rounded "
        style={{
          background:
            "radial-gradient(circle at center, rgba(234, 140, 84, 100)",
        }}
      >
        {/* HW->BG gradient */}
        <div className="text-center text-[10px]  flex flex-col w-[10%] text-richblack-400 ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div
          className={`w-[100%] flex flex-col  font-bold font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 5000, ""]}
            wrapper="span"
            speed={50}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            repeat={Infinity}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;

// import React from "react";
// // import HighlighteText from "../componets/cors/Homepage/HighlighteText";
// import CTAButton from "../components/cors/Homepage/Button";
// import { FaArrowRight } from "react-icons/fa";

// function CodeBlocks({
//   position,
//   heading,
//   subheading,
//   ctaBtn1,
//   ctaBtn2,
//   codeblock,
//   backgroundGradient,
//   codeColor,
// }) {
//   return (
//     <div className={`flex ${position} my-20 justify-between gap-10`}>
//       {/* section 1 */}
//       <div className="w-[50%] flex flex-col gap-8">
//         {heading}
//         <div className="text-richblack-300 font-bold">{subheading}</div>

//         <div className="flex gap-7 mt-7">
//           <CTAButton active={ctaBtn1.active} linkto={ctaBtn1.linkto}>
//             <div className="flex">
//               {ctaBtn1.btnText}
//               <FaArrowRight />
//             </div>
//           </CTAButton>
//           <CTAButton active={ctaBtn2.active} linkto={ctaBtn2.linkto}>
//             {ctaBtn2.btnText}
//           </CTAButton>
//         </div>
//       </div>
//       {/* section 2 */}
//     </div>
//   );
// }

// export default CodeBlocks;
