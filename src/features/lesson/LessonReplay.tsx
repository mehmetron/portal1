import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { fetchLessonById } from "./LessonSlice";
import { RootState } from "../../store";

interface Props {}

const LessonReplay = (props: Props) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const taskById = useSelector((state: RootState) => state.task.byId);

  let { id } = useParams();

  React.useEffect(() => {
    if (id) {
      dispatch(fetchLessonById(id));
    }
  }, [id]);

  return (
    <div>
      <button type="button" onClick={() => history.goBack()}>
        Back
      </button>
      <p>ID: {id}</p>
      {taskById[id] && <p>DATA: {JSON.stringify(taskById[id].recording)}</p>}
      <div style={{ padding: "40px", backgroundColor: "red" }}>f</div>
    </div>
  );
};

export default LessonReplay;
