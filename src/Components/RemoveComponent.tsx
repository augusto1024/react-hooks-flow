import clsx from "clsx";
import React from "react";
import TrashIcon from "../Icon/Trash";
import Button from "./Button";

const RemoveComponent = (
  props: React.HTMLProps<HTMLDivElement>
): JSX.Element => {
  const { className, ...otherProps } = props;

  return (
    <div
      className={clsx("center w-full p-5 flex justify-center", className)}
      {...otherProps}
    >
      <Button
        rounded
        className="transition duration-100 ease-in-out hover:bg-gray-100 transform hover:scale-150"
        icon={
          <TrashIcon className="fill-current transition duration-100 ease-in-out text-gray-400 group-hover:text-red-400" />
        }
      />
    </div>
  );
};

export default RemoveComponent;
