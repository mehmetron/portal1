import React from "react";
import { css } from "@emotion/core";
import { Chip, ChipProps } from "@material-ui/core";
import { getContrastColor, WHITE } from "../utils/colors";
import { PriorityValue, ITask } from "../types";
import { PRIORITY_MAP } from "../const";

interface Props extends ChipProps {
  task: ITask;
  onCard?: boolean;
}

const PriorityChip = ({ task, onCard = true, ...rest }: Props) => {
  // const contrastColor = getContrastColor(label.color);

  var color = "#2980b9";
  var contrastColor = "white";
  // if (task.priority == "H") color = "green";
  // if (task.priority == "M") color = "blue";
  // if (task.priority == "L") color = "orange";

  return (
    <Chip
      variant="outlined"
      data-testid={`priority${task.id}`}
      label={PRIORITY_MAP[task.priority].label}
      css={css`
        overflow: auto;
        background-color: ${color};
        color: ${contrastColor};
        border: ${contrastColor === WHITE && "none"};
        border-radius: 4px;
        ${onCard &&
        `
          cursor: pointer;
          max-width: fit-content; 
          margin-bottom: 0.125rem; 
          margin-right: 0.125rem; 
          font-size: 10px; 
          height: unset;
        `}
        .MuiChip-label {
          ${onCard &&
          `
            padding: 1px 0.75em;
            line-height: 1.5;
            height: 18px;
            font-size: 10px;
          `}
        }
        .MuiChip-deleteIcon {
          color: ${contrastColor};
        }
      `}
      {...rest}
    />
  );
};

export default PriorityChip;
