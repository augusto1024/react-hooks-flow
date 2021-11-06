import clsx from "clsx";
import React from "react";
import StopIcon from "../Icon/Stop";
import PlayIcon from "../Icon/Play";
import Button from "./Button";

interface StartStopProps extends React.HTMLProps<HTMLDivElement> {
  running: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const StartStop = ({
  disabled = false,
  className,
  running,
  onClick,
  ...props
}: StartStopProps): JSX.Element => {
  return (
    <div className={`center flex justify-center ${className || ""}`} {...props}>
      <Button
        onClick={onClick}
        disabled={disabled}
        className={clsx(
          "sm:w-full",
          !disabled && "transition duration-100 ease-in-out hover:text-white",
          !running && !disabled && "hover:bg-green-400",
          running && "bg-red-400 hover:bg-red-500 text-white",
          disabled && "bg-gray-100 cursor-not-allowed text-gray-400"
        )}
        icon={
          !running ? (
            <PlayIcon
              className={clsx(
                "fill-current text-green-400",
                !disabled &&
                  "transition duration-100 ease-in-out group-hover:text-white"
              )}
            />
          ) : (
            <StopIcon
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
