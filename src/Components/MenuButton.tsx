import clsx from "clsx";
import React from "react";
import MoreIcon from "../Icon/Menu";
import Button from "./Button";

interface MenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  actions: { name: string; action: () => void }[];
}

const MenuButton = (props: MenuButtonProps): JSX.Element => {
  const { actions } = props;
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
        className="rounded-full transition duration-100 ease-in-out hover:bg-gray-50"
        {...props}
        icon={<MoreIcon className="fill-current text-gray-400" />}
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
          <button key={action.name} className="p-2" onClick={action.action}>
            {action.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuButton;
