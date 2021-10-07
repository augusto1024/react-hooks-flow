import React from "react";
import clsx from "clsx";

const PauseIcon = (props: React.SVGProps<SVGSVGElement>) => {
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
      <path d="M10 24h-6v-24h6v24zm10-24h-6v24h6v-24z" />
    </svg>
  );
};

export default PauseIcon;
