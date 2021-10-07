import clsx from "clsx";
import React from "react";
import MoreIcon from "../Icon/Menu";
import "../Styles/Markdown.css";

const Mark = ({ children }: React.HTMLProps<HTMLDivElement>): JSX.Element => {
  return (
    <mark className="inline-block px-1 py-0 rounded-md shadow-sm bg-gray-100 text-red-400">
      {children}
    </mark>
  );
};

const Emoji = ({ children }: React.HTMLProps<HTMLDivElement>): JSX.Element => {
  return <div className="emoji">{children}</div>;
};

export const Intro = (props: React.HTMLProps<HTMLDivElement>): JSX.Element => {
  const { className, ...otherProps } = props;

  return (
    <div
      className={clsx(
        "bg-white shadow-md rounded-md p-5 markdown-body",
        className
      )}
      {...otherProps}
    >
      <h2>React Hooks Flow</h2>
      <p>
        The goal of this app is to help people understand how{" "}
        <a href="http://www.google.com">React Hooks</a> work. You can add and
        nest multiple components and use your browser's developer console to see
        when and how triggers are, well..., triggered.
      </p>
      <p>
        👉 This application was based on{" "}
        <a href="https://github.com/donavon">Donavon West</a>'s{" "}
        <a href="https://github.com/donavon/hook-flow">React hooks flow</a>{" "}
        diagram.
      </p>

      <h3>Instructions</h3>
      <ul className="list-decimal list-inside m-2">
        <li>
          Click the <Mark>Add Component</Mark> button to add a new component.
        </li>
        <li>Add more components and drag them inside other components.</li>
        <li>
          Fire up your browser's developer console and go to the{" "}
          <Mark>Console</Mark> tab.
        </li>
        <li>
          Click the <Emoji>▶️</Emoji> button and see how the triggers get
          triggered on your browser's console.
        </li>
        <li>
          Click on the{" "}
          <MoreIcon
            className="inline-flex text-xs m-0.5 -ml-0.5"
            width="15px"
            height="15px"
          />
          button on some component and fire different actions. Take a look at
          the console to see how those actions affect the app.
        </li>
      </ul>

      <h3>Notes</h3>
      <ul className="m-1">
        <li>
          <Emoji>💡</Emoji> You can identify which component triggered what by
          looking at it's identifier and color.
        </li>
        <li>
          <Emoji>🗑️</Emoji> You can delete components by dragging them to the
          trash icon on the bottom.
        </li>
        <li>
          <Emoji>⚠️</Emoji> Once you clicked on the <Emoji>▶️</Emoji> button,
          you're not going to be able to drag components. You need to click the{" "}
          <Emoji>⏸️</Emoji> button to do so.{" "}
        </li>
      </ul>
    </div>
  );
};

export default Intro;
