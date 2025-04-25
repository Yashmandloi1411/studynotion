import React from "react";

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

import timeLineImage from "../../../assets/Images/TimelineImage.png";
const timeline = [
  {
    logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    logo: Logo3,
    heading: "Flexiblity",
    Description: "The ability to switch is an important skills",
  },
  {
    logo: Logo4,
    heading: "Solve the problem",
    Description: "Code you way to a solution",
  },
];
function TimelineSection() {
  return (
    <div className="flex flex-row ">
      <div className="w-[45%] flex flex-row gap-15  items-center justify-around">
        <div className="flex flex-col">
          {timeline.map((elem, index) => (
            <div key={index} className="flex gap-4">
              <div className="mt-2">
                <img src={elem.logo} alt="" />
              </div>
              <div className="flex flex-col  ">
                <h2 className="font-bold text-pure-greys-500">
                  {elem.heading}
                </h2>
                <p className="text-base">{elem.Description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[55%]  mt-8 relative shadow-blue-200">
        <img
          src={timeLineImage}
          alt=""
          className="rounded w-[40vw] h-[60vh] shadow-lg object-cover"
        />

        <div className="absolute flex p-5 left-[45%] translate-x-[-60%] translate-y-[-50%] bg-[#014A32] text-[#f9f9f9a1]  uppercase ">
          <div className="flex flex-row gap-5">
            <p className="text-white ">10</p>
            <div className="flex flex-col ">
              <p className="text-sm font-semibold ">Years</p>
              <p className="text-sm font-semibold">Experiences</p>
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <p className="text-white">250</p>
            <div className="flex flex-col">
              <p className="text-sm font-semibold ">Types of </p>
              <p className="text-sm font-semibold ">Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineSection;
