import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  rounded?: boolean;
}

const Button = (props: ButtonProps = { rounded: false }): JSX.Element => {
  const { children, className, icon, rounded, ...otherProps } = props;

  return (
    <button
      className={clsx(className, "p-3 group", {
        "rounded-full": rounded,
        "rounded-md": !rounded,
      })}
      {...otherProps}
    >
      <div className="flex flex-row space-x-3">
        {icon || null}
        {children && <div>{children}</div>}
      </div>
    </button>
  );
};

export default Button;
