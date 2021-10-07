import clsx from "clsx";
import React from "react";
import AddIcon from "../Icon/Add";
import Button from "./Button";

interface AddComponentProps extends React.HTMLProps<HTMLDivElement> {
  canAdd: boolean;
  onAdd: () => void;
}

const AddComponent = (props: AddComponentProps): JSX.Element => {
  const { className, canAdd, onAdd, ...otherProps } = props;

  return (
    <div
      className={`center flex justify-center ${className || ""}`}
      {...otherProps}
    >
      <Button
        disabled={!canAdd}
        onClick={onAdd}
        className={clsx(
          canAdd &&
            "transition duration-100 ease-in-out hover:bg-blue-400 hover:text-white",
          !canAdd && "bg-gray-100 cursor-not-allowed text-gray-400"
        )}
        icon={
          <AddIcon
            className={clsx(
              "fill-current",
              canAdd &&
                "transition duration-100 ease-in-out text-blue-400 group-hover:text-white",
              !canAdd && "text-gray-400"
            )}
          />
        }
      >
        Add Component
      </Button>
    </div>
  );
};

export default AddComponent;
