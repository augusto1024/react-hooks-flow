import React from "react";
import AddIcon from "../Icon/Add";
import Button from "./Button";

interface AddComponentProps extends React.HTMLProps<HTMLDivElement> {
  onAdd: () => void;
}

const AddComponent = (props: AddComponentProps): JSX.Element => {
  const { className, onAdd, ...otherProps } = props;

  return (
    <div
      className={`center w-full p-5 flex justify-center ${className || ""}`}
      {...otherProps}
    >
      <Button
        onClick={onAdd}
        className="transition duration-100 ease-in-out hover:bg-blue-400 hover:text-white"
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
