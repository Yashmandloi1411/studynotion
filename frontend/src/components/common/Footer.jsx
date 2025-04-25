import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { RiYoutubeFill } from "react-icons/ri";

import { FooterLink2 } from "../../data/footer-links";
function Footer() {
  return (
    <div className="flex w-full bg-[#161D29] text-[#686D7A] p-10 mt-5">
      <div className="grid grid-cols-6 gap-4">
        <div className="">
          <i></i>
          <h3 className="text-[#AFB2BF] font-bold">Company</h3>
          <h3>About</h3>
          <h3>Careers</h3>
          <h3>Affiliates</h3>

          <div className="flex gap-2">
            <FaFacebook />
            <AiFillGoogleCircle />
            <FaTwitter />
            <RiYoutubeFill />
          </div>
        </div>
        <div>
          <h3 className="text-[#AFB2BF] font-bold">Articles</h3>
          <h3>Blog</h3>
          <h3>Chart Sheet</h3>
          <h3>Code Challenges</h3>
          <h3>Docs</h3>
          <h3>Project</h3>
          <h3>Video</h3>
          <h3>Worksspaces</h3>
          <div className="mt-3">
            <h3 className="text-[#AFB2BF] font-bold">Support</h3>
            <h3>Help center</h3>
          </div>
        </div>
        <div>
          <h3 className="text-[#AFB2BF] font-bold">Plans</h3>
          <h3>Paid memberships</h3>
          <h3>For students</h3>
          <h3>Business solutions</h3>

          <div>
            <h3 className="text-[#AFB2BF] font-bold mt-3">Community</h3>
            <h3>Forums</h3>
            <h3>Chapters</h3>
            <h3>Events</h3>
          </div>
        </div>
        {/* verticel line */}

        {/* Dynamic rendered section from footerlink2 */}
        {FooterLink2.map((elem, index) => (
          <div key={index}>
            <h3 className="text-[#AFB2BF] font-bold mb-3">{elem.title}</h3>
            {elem.links.map((link, linkIndex) => (
              <p key={linkIndex} className="hover:text-white cursor-pointer">
                <a href={link.link}>{link.title}</a>
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Footer;
