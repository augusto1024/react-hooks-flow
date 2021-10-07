import clsx from "clsx";
import React from "react";
import MoreIcon from "../Icon/Menu";
import Button from "./Button";

interface MenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  actions: { name: string; action: () => void }[];
}

const MenuButton = (props: MenuButtonProps): JSX.Element => {
  const { actions, height, width, disabled, ...otherProps } = props;
  const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleMenu = (): void => setShowMenu(!showMenu);

  React.useEffect(() => {
    const onClickOutside = (e: any) => {
      if (showMenu && ref.current && !ref.current.contains(e.target)) {
        setShowMenu(!showMenu);
      }
    };

    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="relative inline-block">
      <Button
        className={clsx(
          "rounded-full",
          disabled && "cursor-not-allowed",
          !disabled && "transition duration-100 ease-in-out hover:bg-gray-50"
        )}
        disabled={disabled}
        {...otherProps}
        icon={
          <MoreIcon
            height={height}
            width={width}
            className="fill-current text-gray-400"
          />
        }
        onClick={toggleMenu}
      />{" "}
      <div
        ref={ref}
        style={{ minWidth: "300px" }}
        className={clsx(
          "absolute right-0 flex flex-col z-10 bg-white rounded-md shadow-md float-left",
          showMenu ? "block" : "hidden"
        )}
      >
        {actions.map((action) => (
          <button
            key={action.name}
            className="p-2 hover:bg-gray-100"
            onClick={action.action}
          >
            {action.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuButton;
