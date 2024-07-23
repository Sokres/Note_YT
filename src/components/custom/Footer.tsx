import React from "react";
import Logo from "./Logo";
import SocialIcon from "./SocialIcon";
export interface Footer {
  data: {
    logoText: {
      id: number;
      text: string;
      url: string;
    };
    text: string;
    socialLink: SocialLink[];
  };
}
export interface SocialLink {
  id: number;
  text: string;
  url: string;
}
const Footer = ({ data }: Readonly<Footer>) => {
  const { socialLink } = data;
  return (
    <footer className="bg-slate-700 py-6">
      <div className="mx-auto my-0 flex justify-between px-20">
        <Logo></Logo>
        <SocialIcon socialLink={socialLink} />
      </div>
    </footer>
  );
};

export default Footer;
