// @ts-nocheck
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { car, bike } from "../actions";

export default function Lesson() {
  const counter = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h2>Lesson</h2>
      <button
        onClick={() =>
          dispatch({
            type: car,
          })
        }
      >
        Car
      </button>{" "}
      &nbsp;&nbsp;&nbsp;
      <h1>{counter.vehicle}</h1>
      <button
        onClick={() =>
          dispatch({
            type: bike,
          })
        }
      >
        Bike
      </button>
    </div>
  );
}
