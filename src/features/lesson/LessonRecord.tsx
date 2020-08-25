import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { TextField } from "@material-ui/core";

import { fetchLessonById } from "./LessonSlice";
import { RootState } from "../../store";
import { patchTask } from "../task/TaskSlice";

interface Props {}

const LessonRecord = (props: Props) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [recording, setRecording] = useState<string>();

  const taskById = useSelector((state: RootState) => state.task.byId);

  let { id } = useParams();

  React.useEffect(() => {
    if (id) {
      dispatch(fetchLessonById(id));
    }
  }, [id]);

  const handleSaveRecording = () => {
    if (id) {
      dispatch(patchTask({ id: id, fields: { recording } }));
    }
  };

  return (
    <div>
      <button type="button" onClick={() => history.goBack()}>
        Back
      </button>

      <TextField
        id="add-recording"
        data-testid="add-recording"
        label="Add Recording"
        value={recording}
        onChange={(e) => setRecording(e.target.value)}
        variant="outlined"
        placeholder="recording..."
        helperText="fake recording..."
        fullWidth
        size="small"
        onBlur={handleSaveRecording}
        error={false}
      />

      <p>ID: {id}</p>
      {taskById[id] && <p>DATA: {JSON.stringify(taskById[id].recording)}</p>}
      <div style={{ padding: "40px", backgroundColor: "red" }}>f</div>
    </div>
  );
};

export default LessonRecord;
