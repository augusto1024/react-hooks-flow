import React from "react";
import clsx from "clsx";

const StopIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const { className, ...otherProps } = props;
  return (
    <svg
      className={clsx(className)}
      {...otherProps}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M2 2h20v20h-20z" />
    </svg>
  );
};

export default StopIcon;
