import React, { useState } from "react";

import HighlighteText from "./HighlighteText";

import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";

const tabName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "career paths",
];
function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabName[0]);

  const [courses, setCourses] = useState(HomePageExplore[0].courses);

  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => {
      return course.tag === value;
    });

    setCourses(result[0].courses);

    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div>
      <div className="flex flex-col text-center">
        <div className="flex flex-col">
          <div className="text-3xl text-white mb-2">
            Unlock the <HighlighteText text={"Power of Code"} />
          </div>
          <div className="text-[#838894]">
            Learn to Build Anything You Can Imagine
          </div>
        </div>

        <div className="mt-2 flex flex-row gap-5  mx-auto  bg-[#161D29] rounded-full w-fit p-2">
          {tabName.map((elem, index) => {
            return (
              <div
                className={`text-[16px] items-center  gap-5 flex text-white
                              ${
                                currentTab === elem
                                  ? "bg-[#2C333F] text-richblack-5 rounded-lg p-2"
                                  : "text-[#999DAA] rounded-full"
                              }
                          `}
                key={index}
                onClick={() => setMyCards(elem)}
              >
                {elem}
              </div>
            );
          })}
        </div>

        {/* course card ka group */}
        <div className="  mt-10  grid gird-cols-1 sm:grid-cols-3   mx-auto  text-black">
          {courses.map((elem, index) => {
            return (
              <CourseCard
                key={index}
                index={index}
                cardData={elem}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ExploreMore;

{
  /* <div key={index} className="flex flex-row items-start  gap-2">
<div className="flex gap-2">
  <h2 className="text-lg font-semibold">{elem}</h2>
  <p className="text-sm">{}</p>

  <div className="border border-dashed w-full bg-black h-1"></div>

  <div className="flex flex-col text-[#0F7A9D] gap-2">
    <h2 className="text-base font-medium">Level</h2>
    <h2 className="text-base font-medium">Lesson</h2>
  </div>
</div>
</div> */
}
