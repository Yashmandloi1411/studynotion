import React from "react";

import { IoMdContacts } from "react-icons/io";
import { IoPerson } from "react-icons/io5";

function CourseCard({ cardData, index, currentCard, setCurrentCard }) {
  // console.log(cardData);

  const bgColor =
    index === 0 ? "bg-white" : index === 1 ? "bg-[#161D29] " : "bg-[#161D29] ";

  const textColor =
    index === 0
      ? "bg-white"
      : index === 1
      ? "text-[#DBDDEA]"
      : "text-[#DBDDEA] ";

  const DescriptionColor =
    index === 0
      ? "bg-white"
      : index === 1
      ? "text-[#DBDDEA]"
      : "text-[#DBDDEA] ";
  return (
    <div className="mb-5  ">
      <div
        className={`p-4 shadow-md rounded-lg  w-[50%] sm:w-[90%] h-fit mx-auto ${bgColor}`}
      >
        <h2 className={`font-bold ${textColor}`}>{cardData.heading}</h2>
        <p className={`${DescriptionColor}`}>{cardData.description}</p>

        <div className="flex  justify-between  mt-3 sm:mt-5">
          <div className="flex items-center gap-1 text-[#0F7A9D]">
            <IoMdContacts />
            <h4>{cardData.level}</h4>
          </div>
          <div className="flex items-center gap-1  text-[#0F7A9D]">
            <IoPerson />
            <h4>LessionNumber: {cardData.lessionNumber}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
