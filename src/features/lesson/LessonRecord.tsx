// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { TextField } from "@material-ui/core";
import { ReactComponent as TimesIcon } from "../../static/svg/times.svg";

import { fetchLessonById } from "./LessonSlice";
import { RootState } from "../../store";
import { patchTask, updateAudio } from "../task/TaskSlice";
import { StyledEditor } from "../Editor/StyledEditor.tsx";
import SimpleBottomNavigation from "./recordingFooter";
import useRecorder from "./useRecorder"

import * as rrweb from "rrweb";
import RecordingFooter from "./recordingFooter";

interface Props {}

const LessonRecord = (props: Props) => {
  const dispatch = useDispatch();

  const [events, setEvents] = useState([]);

  const taskById = useSelector((state: RootState) => state.task.byId);



    let { id } = useParams();

    // useEffect(() => {
    //     rrweb.record({
    //         emit(event) {
    //             // push event into the events array
    //             setEvents(events => events.concat(event));
    //         }
    //     });
    //     // audiorec();
    // }, []);



    // const audioRef = useRef();

    // function audiorec() {
    //     (async () => {
    //         audioRef.current = await recordAudio();
    //         audioRef.current.start();
    //     })();
    // }


    let [blob, audioURL, isRecording, startRecording, stopRecording] = useRecorder();

    // function stopAndSave() {
    //     stopRecording()
    //
    //     let body = JSON.stringify({ audioURL })
    //     dispatch(patchTask({ id: id, fields: { audio: body } }));
    //
    // }

    // this function will send events to the backend and reset the events array
    function save() {

        stopRecording()


        console.log("1", events);
        const body = JSON.stringify({ events });
        console.log("2", body)
        console.log("3", events)

        if (id) {
            dispatch(patchTask({ id: id, fields: { recording: body} }));
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



    function record() {
        rrweb.record({
            emit(event) {
                // push event into the events array
                setEvents(events => events.concat(event));
            }
        });
        startRecording()

    }



  React.useEffect(() => {
    if (id) {
      dispatch(fetchLessonById(id));
    }
  }, [id]);




    React.useEffect(() => {

        // dispatch(updateAudio({id: id, fields: {audioblob: JSON.stringify({blob})}}));

        setTimeout(() => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                const base64AudioMessage = reader.result.split(",")[1];
                const base64AudioMessage2 = base64AudioMessage.substring(2);

                if (base64AudioMessage.length > 200) {
                    dispatch(updateAudio({id: id, fields: {audioblob: reader.result}}));
                    console.log("blob updated", blob)
                    console.log("reader.result", reader.result)
                    console.log("base64AudioMessage", base64AudioMessage)
                    console.log("base64AudioMessage2", base64AudioMessage2)
                }
            }
        }, 5000)

        // var file = new File([blob], "name");
        // dispatch(patchTask({id: id, fields: {audioblob: JSON.stringify(blob)}}));
        // console.log("blob", blob)
        // console.log("file blob updated", file)

    }, [blob]);


    const myLesson = useSelector((state: RootState) => state.lesson.detail);
    console.log("this is myLesson: ", myLesson)

  // const handleSaveRecording = () => {
  //   if (id) {
  //     dispatch(patchTask({ id: id, fields: { recording } }));
  //   }
  // };


    // console.log("my audio please work", audioURL)


  return (
    <div>


        <StyledEditor />

        <div>
            <audio id="myAudio" src={audioURL} controls />
            <button onClick={startRecording} disabled={isRecording}>
                start recording
            </button>
            <button onClick={stopRecording} disabled={!isRecording}>
                stop recording
            </button>
        </div>









            <button onClick={save}>
                Save
            </button>

        <hr></hr>
        <RecordingFooter onSave={save} record={record}/>
    </div>
  );
};

export default LessonRecord;
