import React from "react";
import { FaArrowRight } from "react-icons/fa";

import { Link } from "react-router-dom";

import HighlighteText from "../components/cors/Homepage/HighlighteText";

import CTAButton from "../components/cors/Homepage/Button";

import Banner from "../assets/Images/banner.mp4";

import CodeBlocks from "../components/cors/Homepage/CodeBlocks";

import TimelineSection from "../components/cors/Homepage/TimelineSection";

import LearningLanguageSection from "../components/cors/Homepage/LearningLanguageSection";

import ExploreMore from "../components/cors/Homepage/ExploreMore";
import InstructorSection from "../components/cors/Homepage/InstructorSection";

import Footer from "../components/common/Footer";
function Home() {
  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white ">
        <header></header>

        <Link to={"/signup"}>
          <div className=" hover:scale-95 transition-all duration-200 shadow-xl group mt-16 mx:0 sm:mx-auto bg-[#161D29] rounded-full font-bold text-white p-1 border-b-2  ">
            <div className="flex gap-2 justify-center items-center rounded-full  p-1 shadow-xl">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className=" mt-4 sm:mt-7 flex flex-col text-left sm:text-center text-xl sm:text-4xl   w-[85%] sm:w-[70%]">
          Empower Your Future with <HighlighteText text={"Coding Skills"} />
        </div>
        <div className="mt-4 text-gray-400 font-bold text-xs sm:text-sm flex  text-left sm:text-center  w-[85%] sm:w-[70%]   ">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world , and get access to a wealth of resources,
          including hands-on project,quizzes, and personalized feedback from
          instructor
        </div>
        <div className="gap-2 flex  ">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="relative mt-8 flex ">
          <video
            muted
            loop
            autoPlay
            className=" mr-3 w-[100%] h-[70vh] mx-auto"
          >
            <source src={Banner} />
          </video>
        </div>
        {/* code section 1 */}
        <div>
          <CodeBlocks
            position={"flex flex-col sm:flex-row"}
            heading={
              <div className=" text-2xl sm:text-4xl">
                Unlock your <HighlighteText text={"coding potential"} /> with
                our online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: "true",
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: "false",
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title></head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n<a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a></nav>\n</body>\n</html>`}
            codeColor={"text-yellow-400"}
          />
        </div>
      </div>
      {/* code section 2 */}
      <div>
        <CodeBlocks
          position={" flex-col  lg:flex-row-reverse"}
          heading={
            <div className="text-2xl sm:text-4xl">
              Start <HighlighteText text={"coding in seconds"} />
            </div>
          }
          subheading={
            "Go ahead, give it a try.Our hands-on learning environment means you'll be writing real code from your very first lesson."
          }
          ctabtn1={{
            btnText: "Continue Lesson",
            linkto: "/signup",
            active: "true",
          }}
          ctabtn2={{
            btnText: "Learn More",
            linkto: "/login",
            active: "false",
          }}
          codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title></head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n<a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a></nav>\n</body>\n</html>`}
          codeColor={"text-yellow-400"}
        />
      </div>

      <ExploreMore />
      {/* section 2 */}
      <div className="bg-white text-richblack-700">
        {/* Background Section */}
        <div className="homepage_bg h-[310px] flex justify-center items-center">
          <div className="w-11/12 max-w-maxContent flex justify-center">
            <div className="flex gap-7">
              <CTAButton active={true} linkto={"/signup"}>
                Explore Full Catalog
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-7 mx-auto w-11/12 max-w-maxContent">
          {/* Left Section */}
          <div className="text-center md:text-left text-4xl w-full md:w-[45%]">
            Get the Skills you need for a{" "}
            <HighlighteText text={"job that is in demand"} />
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center md:items-start text-pure-greys-400 w-full md:w-[40%] text-center md:text-left">
            <p className="text-[16px] mt-4">
              The modern StudyNotion dictates its own terms. Today, to be a
              competitive specialist requires more than professional skills.
            </p>
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>
          </div>
        </div>

        <TimelineSection />
        <LearningLanguageSection />
      </div>

      {/* section 3 */}
      <div className="w-11/12 max-m-maxContent flex-col items-center justify-between gap-8 bg-richblack-900">
        <InstructorSection />
        {/* <ReviewSection/> */}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
