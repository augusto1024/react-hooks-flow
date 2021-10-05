import clsx from "clsx";

const Component = (props: React.HTMLProps<HTMLDivElement>): JSX.Element => {
  const { className, ...otherProps } = props;

  return (
    <div
      style={{ minWidth: "400px", margin: "10px" }}
      className={clsx("bg-white shadow-sm rounded-md p-4 flex-auto", className)}
      {...otherProps}
    >
      Component
    </div>
  );
};

export default Component;
