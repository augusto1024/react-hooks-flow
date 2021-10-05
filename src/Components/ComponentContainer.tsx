import clsx from "clsx";
import React from "react";
import Component from "./Component";

const ComponentContainer = (
  props: React.HTMLProps<HTMLDivElement>
): JSX.Element => {
  const { className, ...otherProps } = props;
  return (
    <div
      className={clsx(
        "bg-gray-100 shadow-inner rounded-md w-full p-5 flex flex-wrap",
        className
      )}
      {...otherProps}
    >
      <Component />
      <Component />
      <Component />
    </div>
  );
};

export default ComponentContainer;
