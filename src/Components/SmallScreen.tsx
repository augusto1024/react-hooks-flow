import clsx from "clsx";
import React from "react";
import SadFaceIcon from "../Icon/SadFace";

const SmallScreen = ({
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        "bg-white shadow-md rounded-md p-5 markdown-body text-center",
        className
      )}
      {...props}
    >
      <SadFaceIcon className="m-auto mb-4 w-28 h-28" />
      <p>
        Your device's screen is to small to use this app. Please, open the app
        in a device with a bigger screen. Keep in mind that the device will also
        need to be able to access the browser's developer console, so a PC or
        laptop would be ideal 😄.
      </p>
    </div>
  );
};

export default SmallScreen;
