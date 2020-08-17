import React, { useEffect } from "react";
import List from "./List";
import Modals from "./Modals";

import { RootState } from "../../store";
import Spinner from "../../components/Spinner";

import { fetchAllLessons, fetchLessonById } from "./LessonSlice";
import { useSelector, useDispatch } from "react-redux";

export default function LessonPage() {
  const loading = useSelector((state: RootState) => state.lesson.fetchLoading);
  const todos = useSelector((state: RootState) => state.lesson.all);
  const todo = useSelector((state: RootState) => state.lesson.detail);
  console.log("maybe this works ", todos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllLessons());
  }, []);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  function getstuff(id: string) {
    dispatch(fetchLessonById(id));
  }

  return (
    <div>
      {todo && (
        <div>
          <p>Title: {todo?.title}</p>
          <p>Status: {todo?.completed.toString()}</p>
          <p>User: {todo?.userId}</p>
          <p>ID: {todo?.id}</p>
        </div>
      )}
      <button onClick={() => getstuff("4")}>get</button>
      <Modals>
        <List />
      </Modals>
      <p>what sis something about this world i dont understand</p>
      <p>My chicken nuggets say high</p>
      <h2>Fam is always to blam</h2>
      {/* <List /> */}

      {todos.map((todo, index) => (
        <div key={todo.id}>
          <br></br>
          <p style={{ color: "red" }}>Task: {todo.title}</p>
          <p>Status: {todo.completed.toString()}</p>
          <p>User: {todo.userId}</p>
          <br></br>
        </div>
      ))}
    </div>
  );
}
