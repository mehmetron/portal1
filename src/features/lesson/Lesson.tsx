import React, { Fragment } from "react";

export default function Lesson(props: {
  id: string | number | undefined;
  title: React.ReactNode;
  duration: React.ReactNode;
}) {
  return (
    <Fragment>
      <li key={props.id}>
        <a
          href={"/screencasts/" + props.id}
          className="flex justify-start items-center mb-1 rounded-full -mx-1 p-1 pr-2 hover:bg-gray-100 "
        >
          <span
            style={{ width: "1.75rem" }}
            className="mr-2 rounded-full   text-indigo-600 hover:text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            <svg
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="css-i6dzq1"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke-width="1"
                fill="transparent"
              />
              <polygon
                points="10 8 16 12 10 16 10 8"
                fill="currentColor"
                stroke-width="1"
                stroke="currentColor"
              />
            </svg>
          </span>
          <span className="text-xs font-semibold ">{props.title}</span>
          <span className="text-xs font-bold ml-auto text-gray-500">
            {props.duration}
          </span>
        </a>
      </li>
    </Fragment>
  );
}
