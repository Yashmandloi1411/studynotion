import React from "react";

import HighlighteText from "./HighlighteText";

import CTAButton from "./Button";

import card2 from "../../../assets/Images/Compare_with_others.svg";
import card1 from "../../../assets/Images/Know_your_progress.svg";
import card3 from "../../../assets/Images/Plan_your_lessons.svg";

function LearningLanguageSection() {
  return (
    <div className="">
      <div className="flex flex-col text-center mt-[10%]">
        <div className="text-3xl ">
          Your swiss Knife for <HighlighteText text={"Learning any language"} />
        </div>

        <p className="text-pure-greys-400 mt-3">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over,progress tracking, custom schedule and more.
        </p>

        <div className="flex flex-row">
          <div>
            {" "}
            <img src={card1} alt="" className="object-contain mr-10" />
          </div>
          <div>
            {" "}
            <img src={card2} alt="" />
          </div>
          <div>
            {" "}
            <img src={card3} alt="" />
          </div>
        </div>

        <div className="w-fit flex mx-auto mb-5">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
        </div>
      </div>
    </div>
  );
}

export default LearningLanguageSection;
