import React from "react";
import clsx from "clsx";

const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const { className, ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={clsx(className)}
      {...otherProps}
    >
      <path d="M3 22v-20l18 10-18 10z" />
    </svg>
  );
};

export default PlayIcon;
