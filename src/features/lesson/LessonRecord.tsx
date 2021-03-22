// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { TextField } from "@material-ui/core";

import { fetchLessonById } from "./LessonSlice";
import { RootState } from "../../store";
import { patchTask } from "../task/TaskSlice";
import { StyledEditor } from "../Editor/Editor.tsx";
import SimpleBottomNavigation from "./recordingFooter";

import * as rrweb from "rrweb";
import RecordingFooter from "./recordingFooter";

interface Props {}

const LessonRecord = (props: Props) => {
  const dispatch = useDispatch();

  const [recording, setRecording] = useState();
  const [events, setEvents] = useState([]);

  const taskById = useSelector((state: RootState) => state.task.byId);




    let { id } = useParams();

    useEffect(() => {
        rrweb.record({
            emit(event) {
                // push event into the events array
                setEvents(events => events.concat(event));
            }
        });
        // audiorec();
    }, []);

    const audioRef = useRef();

    // function audiorec() {
    //     (async () => {
    //         audioRef.current = await recordAudio();
    //         audioRef.current.start();
    //     })();
    // }


    // this function will send events to the backend and reset the events array
    function save() {
        console.log("1", events);
        const body = JSON.stringify({ events });
        console.log("2", body)
        setRecording(events)
        console.log("3", events)


        if (id) {
            dispatch(patchTask({ id: id, fields: { recording: body } }));
        }

        // (async () => {
        //     const audio = await audioRef.current.stop();
        //     audio.play();
        //
        //     const reader = new FileReader();
        //     reader.readAsDataURL(audio.audioBlob);
        //     reader.onload = () => {
        //         const base64AudioMessage = reader.result.split(",")[1];
        //
        //         // fetch("http://localhost:5000/api/entries/messages", {
        //         //   method: "POST",
        //         //   headers: { "Content-Type": "application/json" },
        //         //   body: JSON.stringify({
        //         //     token: localStorage.getItem("token"),
        //         //     message: base64AudioMessage
        //         //   })
        //         // }).then(res => {
        //         //   console.log(
        //         //     "Invalid status saving audio message or done idk: " + res.status
        //         //   );
        //         // });
        //
        //         fetch(
        //             `http://localhost:5000/api/entries/lesson/${props.match.params.id}`,
        //             {
        //                 method: "PUT",
        //                 headers: {
        //                     "Content-Type": "application/json"
        //                 },
        //                 body: JSON.stringify({
        //                     token: localStorage.getItem("token"),
        //                     events,
        //                     message: base64AudioMessage
        //                 })
        //             }
        //         );
        //     };
        // })();

        // fetch(`http://localhost:5000/api/entries/lesson/${props.match.params.id}`, {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify({
        //     token: localStorage.getItem("token"),
        //     events,
        //     message: base64AudioMessage
        //   })
        // });


       console.log("recording from state?: ", taskById[id] ? taskById[id].recording : null)

        const replayer = new rrweb.Replayer(events, {mouseTail: false});
        replayer.play();
        setEvents([]);
    }



    // const recordAudio = () =>
    //     new Promise(async resolve => {
    //         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //         // const mimeType = "audio/webm";
    //         // const mediaRecorder = new MediaRecorder(stream, { type: mimeType });
    //         const mediaRecorder = new MediaRecorder(stream);
    //         const audioChunks = [];
    //
    //         mediaRecorder.addEventListener("dataavailable", event => {
    //             audioChunks.push(event.data);
    //         });
    //
    //         const start = () => mediaRecorder.start();
    //
    //         const stop = () =>
    //             new Promise(resolve => {
    //                 mediaRecorder.addEventListener("stop", () => {
    //                     const audioBlob = new Blob(audioChunks);
    //                     const audioUrl = URL.createObjectURL(audioBlob);
    //                     const audio = new Audio(audioUrl);
    //                     const play = () => audio.play();
    //                     resolve({ audioBlob, audioUrl, play });
    //                 });
    //
    //                 mediaRecorder.stop();
    //             });
    //
    //         resolve({ start, stop });
    //     });







  React.useEffect(() => {
    if (id) {
      dispatch(fetchLessonById(id));
    }
  }, [id]);

    const myLesson = useSelector((state: RootState) => state.lesson.detail);
    console.log("this is myLesson: ", myLesson)

  const handleSaveRecording = () => {
    if (id) {
      dispatch(patchTask({ id: id, fields: { recording } }));
    }
  };

  return (
    <div>


        <StyledEditor />

      {/*<TextField*/}
      {/*  id="add-recording"*/}
      {/*  data-testid="add-recording"*/}
      {/*  label="Add Recording"*/}
      {/*  value={recording}*/}
      {/*  onChange={(e) => setRecording(e.target.value)}*/}
      {/*  variant="outlined"*/}
      {/*  placeholder="recording..."*/}
      {/*  helperText="fake recording..."*/}
      {/*  fullWidth*/}
      {/*  size="small"*/}
      {/*  onBlur={handleSaveRecording}*/}
      {/*  error={false}*/}
      {/*/>*/}

      {/*<p>ID: {id}</p>*/}
      {/*{taskById[id] && <p>DATA: {JSON.stringify(taskById[id].recording)}</p>}*/}
      {/*<div style={{ padding: "40px", backgroundColor: "red" }}>f</div>*/}







            <button onClick={save}>
                Save
            </button>

        <hr></hr>
        <RecordingFooter onSave={save}/>
    </div>
  );
};

export default LessonRecord;
