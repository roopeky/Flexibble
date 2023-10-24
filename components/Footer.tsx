import React from "react";
import Image from "next/image";
import { footerLinks } from "@/constants";
import Link from "next/link";

const year = new Date().getFullYear();

type ColumnProps = {
  title: string;
  links: Array<string>;
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="footer_column">
    <h4 className="font-semibold ">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link href="/" key={link}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <Image
            src="/logo-purple.svg"
            width={115}
            height={38}
            alt="logo-purple"
          />

          <p className="text-start text-sm font-normal mt-5 max-w-xs">
            Flexibble is a community of designers and developers who share their
            work process, tips, and tricks.
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          {footerLinks.map((link, index) => (
            <div key={index} className="flex-1 flex flex-col gap-4">
              <FooterColumn title={link.title} links={link.links} />
            </div>
          ))}
        </div>
      </div>

      <div className="flexBetween footer_copyright">
        <p>@ {year} Flexibble. All rights reserved.</p>
        <p className="text-gray">
          <span className="text-black font-semibold">10,214</span> projects
          submitted
        </p>
      </div>
    </footer>
  );
};

export default Footer;
