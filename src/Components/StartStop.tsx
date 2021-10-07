import clsx from "clsx";
import React from "react";
import PauseIcon from "../Icon/Pause";
import PlayIcon from "../Icon/Play";
import Button from "./Button";

interface StartStopProps extends React.HTMLProps<HTMLDivElement> {
  running: boolean;
  onClick: () => void;
}

const StartStop = (props: StartStopProps): JSX.Element => {
  const { className, running, onClick, ...otherProps } = props;

  return (
    <div
      className={`center flex justify-center ${className || ""}`}
      {...otherProps}
    >
      <Button
        onClick={onClick}
        className={clsx(
          "transition duration-100 ease-in-out hover:text-white",
          !running && "hover:bg-green-400",
          running && "bg-red-400 hover:bg-red-500 text-white"
        )}
        icon={
          !running ? (
            <PlayIcon className="fill-current transition duration-100 text-green-400 ease-in-out group-hover:text-white" />
          ) : (
            <PauseIcon
              className={clsx(
                "fill-current transition duration-100 ease-in-out"
              )}
            />
          )
        }
      >
        {running ? "Stop" : "Start"} App
      </Button>
    </div>
  );
};

export default StartStop;
