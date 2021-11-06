import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  rounded?: boolean;
}

const Button = (
  { children, className, icon, rounded, ...props }: ButtonProps = {
    rounded: false,
  }
): JSX.Element => {
  return (
    <button
      className={clsx(className, "p-3 group", {
        "rounded-full": rounded,
        "rounded-md": !rounded,
      })}
      {...props}
    >
      <div className="flex flex-row justify-center space-x-3">
        {icon || null}
        {children && <div>{children}</div>}
      </div>
    </button>
  );
};

export default Button;
