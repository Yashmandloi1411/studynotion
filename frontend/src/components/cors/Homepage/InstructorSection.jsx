import React from "react";

import HighlighteText from "./HighlighteText";

import Instructor from "../../../assets/Images/Instructor.png";

import CTAButton from "./Button";

function InstructorSection() {
  return (
    <div className="mt-10">
      <div className=" flex gap-20 items-center">
        {/* left box */}
        <div className="w-[50%] ml-10 rounded-md">
          <img src={Instructor} alt="" className="shadow-white" />
        </div>

        {/* Right box */}
        <div className="w-[50%] flex flex-col">
          <div className="text-3xl text-white">
            Become an <HighlighteText text={"Instructor"} />
          </div>
          <p className="text-[#838894] mt-3">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>
          <div className="w-fit flex mx-auto mt-3">
            <CTAButton active={true} linkto={"/signup"}>
              Start Teaching Today
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorSection;
