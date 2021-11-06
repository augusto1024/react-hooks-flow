import clsx from "clsx";
import React from "react";
import GithubIcon from "../Icon/Github";

const Footer = ({ className, ...props }: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div className={clsx("flex justify-center", className)} {...props}>
      <a
        className="flex gap-3  p-3 rounded-md w-40 group justify-center transition duration-100 ease-in-out hover:bg-gray-800 hover:text-white"
        href="https://github.com/augusto1024/react-hooks-flow/"
        target="_blank"
        rel="noreferrer"
      >
        <GithubIcon className="fill-current transition duration-100 ease-in-out text-gray-800 group-hover:text-white" />
        <p>Source code</p>
      </a>
    </div>
  );
};

export default Footer;
