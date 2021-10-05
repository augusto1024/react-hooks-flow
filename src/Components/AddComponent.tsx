import React from "react";
import AddIcon from "../Icon/Add";
import Button from "./Button";

const AddComponent = (props: React.HTMLProps<HTMLDivElement>): JSX.Element => {
  const { className, ...otherProps } = props;

  return (
    <div
      className={`center w-full p-5 flex justify-center ${className || ""}`}
      {...otherProps}
    >
      <Button
        className="transition duration-100 ease-in-out hover:bg-blue-500 hover:text-white"
        icon={
          <AddIcon className="fill-current transition duration-100 ease-in-out text-blue-400 group-hover:text-white" />
        }
      >
        Add Component
      </Button>
    </div>
  );
};

export default AddComponent;
