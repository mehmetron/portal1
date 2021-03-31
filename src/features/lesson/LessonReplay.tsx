// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { fetchLessonById } from "./LessonSlice";
import { RootState } from "../../store";
import SimpleModal from "./SimpleModal";
import {StyledEditor} from "../Editor/StyledEditor";
import ReplayFooter, { PrettoSlider } from "./ReplayFooter";


import * as rrweb from "rrweb";


interface Props {}

const LessonReplay = (props: Props) => {
  const [audio, setAudio] = useState()
  const [clicked, setClicked] = useState(false);
  const [codeContent, setCodeContent] = useState(
      "# What is your purpose in life?"
  );
  const [value, setValue] = useState(0);

  const dispatch = useDispatch();
  let history = useHistory();

  let { id } = useParams();


  useEffect(() => {
    if (id) {
      dispatch(fetchLessonById(id));
    }
  }, [id]);




  const sliderRef = useRef();
  const audioRef = useRef();


  const handleChange = (event: any, newValue: number | number[]) => {
    // console.log("new Valuee", newValue)
    // console.log("new event", event)
    // setValue(newValue as number);
  };


  // Get audio from server
  function playAudio(audioFile) {
    audioRef.current = document.getElementById("myAudio");
    audioRef.current.src = audioFile;
  }

  // Initialize rrweb replayer
  function replay(events) {
    console.log("events", events)
    console.log("parsed events", JSON.parse(events))
    console.log("parsed events", JSON.parse(events)["events"])
    sliderRef.current = new rrweb.Replayer(JSON.parse(events)["events"], {mouseTail: false});

  }

  // Play recording and audio from beginning
  function play() {
    document.getElementsByTagName("iframe")[0].setAttribute("frameborder", 0); // Get rid of border around replay iframe
    // if (clicked) {
    //   sliderRef.current.play();
    // }
    if (sliderRef.current) {
      sliderRef.current.play();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setClicked(false);
  }


  // Transport iframe editor contents to user editor
  function run() {
    var sum = "";

    for (var m = 0; m < 1000; m++) {
      try {
        // console.log(document.getElementsByTagName("iframe")[0].contentDocument.getElementsByClassName("CodeMirror-line")[m].innerText + "\n");
        sum =
            sum +
            document
                .getElementsByTagName("iframe")[0]
                .contentDocument.getElementsByClassName("CodeMirror-line")[m]
                .innerText +
            "\n";
        // console.log("this is sum", sum)
      } catch (e) {
        // exit the loop
        break;
      }
    }
    var bob = sum.replace(/\u200B/g, ""); //.replace(/(\r\n|\n|\r)/gm, "");
    // console.log("bob bob", bob)
    setCodeContent(bob);
    // console.log("something", sum.replace(/\u200B/g, "")); //.replace(/•/g, "")
  }



  // Pause recording and audio
  function pause() {
    if (sliderRef.current) {
      sliderRef.current.pause();
      audioRef.current.pause();
    }

    run();

    document.getElementsByTagName("iframe")[0].style.display = "none"; // Hide iframe so only editor showing

    setClicked(true);
  }


  // Resume recordering and audio
  function resume() {
    if (sliderRef.current) {
      let currentTime = Math.round(sliderRef.current.getCurrentTime());
      //   sliderRef.current.play(currentTime);
      sliderRef.current.resume(currentTime);
      audioRef.current.play();
    }

    document.getElementsByTagName("iframe")[0].style.display = "block"; // Make iframe visible after hiding in pause function

    setClicked(false);
    console.log(
        "sliderRef.current.getMetaData().totalTime",
        sliderRef.current.getMetaData().totalTime
    );
    console.log(
        "sliderRef.current.getCurrentTime()",
        sliderRef.current.getCurrentTime()
    );
  }


  // Pause on user click on replayer/iframe
  setTimeout(function () {
    const myIframe = document.getElementsByClassName("replayer-wrapper")[0];

    if (myIframe){
      myIframe.addEventListener("mousedown", (e) => {
        pause();
        console.log(e.clientX, e.clientY);

      });
    }
  }, 1000);


    const taskById = useSelector((state: RootState) => state.lesson.detail);
    // const taskById = useSelector((state: RootState) => state.task.byId);

  // if (taskById){
  //   console.log("taskById", taskById.audioblob)
  // }

  console.log("this is recording hopefully: ", taskById)

  useEffect(() =>{
    if (taskById){
      replay(taskById.recording)
      playAudio(taskById.audioblob);
    }
  }, [taskById])



  function sliderChange(event: any, newValue: number | number[]){
    // var currentTime = sliderRef.current.getCurrentTime();
    // var totalTime = sliderRef.current.getMetaData().totalTime;
    //
    // console.log("currentTime", currentTime)
    // console.log("totalTime", totalTime)
    //
    // // var slider = document.getElementById("myRange");
    // var output = document.getElementById("demo");
    //
    // let percent = Math.min(1, Math.abs(currentTime / totalTime));
    // var recordPercent = percent * 100;
    //
    // console.log("percent", percent)
    // console.log("recordPercent", recordPercent)
    //
    // // slider.value = Math.round(recordPercent);
    // setValue(Math.round(recordPercent))
    // // output.innerHTML = slider.value;
    // output.innerHTML = value;
    //
    //
    //
    //   var tots = percent * totalTime;
    //   console.log("slider.onInput percent", percent)
    //   console.log("slider.onInput tots", tots)
    //
    //
    //   audioRef.current.currentTime = Math.round(tots / 1000);
    //   audioRef.current.play();
    //
    //   sliderRef.current.play(Math.round(tots / 1000) * 1000);
    //   setClicked(false);


  }


  useEffect(() => {
    // Initialize slider percentage and relationship with recording time
    const interval = setInterval(() => {
      if (sliderRef.current) {
        var currentTime = sliderRef.current.getCurrentTime();
        var totalTime = sliderRef.current.getMetaData().totalTime;
        var slider = document.getElementById("myRange");
        var output = document.getElementById("demo");

        console.log("currentTime", currentTime)
        console.log("totalTime", totalTime)
        let percent = Math.min(1, currentTime / totalTime);
        var recordPercent = percent * 100;

        // slider.value = Math.round(recordPercent);
        console.log("recordPercent", recordPercent)
        setValue(Math.round(recordPercent))

        // output.innerHTML = slider.value;
        output.innerHTML = value;

        // Initialize slider
        function slider2() {
          var slider = document.getElementById("myRange");
          var output = document.getElementById("demo");

          var currentTime = sliderRef.current.getCurrentTime();
          var totalTime = sliderRef.current.getMetaData().totalTime;

          // output.innerHTML = slider.value;
          output.innerHTML = value;

          // document.getElementById("demo").innerHTML = document.getElementById(
          //   "myRange"
          // ).value;

          slider.oninput = function () {
            output.innerHTML = this.value;

            var percent = this.value / 100;

            var tots = percent * totalTime;

            audioRef.current.currentTime = Math.round(tots / 1000);
            audioRef.current.play();

            sliderRef.current.play(Math.round(tots / 1000) * 1000);
            setClicked(false);
          };
        }

        slider2();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  function slider(event: any, newValue: number | number[]) {
    setValue(newValue as number)
    // var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");

    var currentTime = sliderRef.current.getCurrentTime();
    var totalTime = sliderRef.current.getMetaData().totalTime;


    // document.getElementById("demo").innerHTML = document.getElementById(
    //   "myRange"
    // ).value;

    // slider.oninput = function() {
    output.innerHTML = value;

    var percent = value / 100;

    var tots = percent * totalTime;

    audioRef.current.currentTime = Math.round(tots / 1000);
    audioRef.current.play();

    sliderRef.current.play(Math.round(tots / 1000) * 1000);
    setClicked(false);
    // };
  }




    return (
    <div>

      <StyledEditor code={codeContent}/>

        <SimpleModal />
      <audio id="myAudio"></audio>
        {taskById && <audio src={taskById.audioblob} controls></audio>}

      {/*<p>ID: {id}</p>*/}
      {/*{taskById && <p>DATA: {JSON.stringify(taskById.recording)}</p>}*/}
      {/*<div style={{ padding: "40px", backgroundColor: "red" }}>f</div>*/}

      <PrettoSlider id="myRange" min={0} max={100} value={value} onChange={handleChange} onChangeCommitted={slider} valueLabelDisplay="off" aria-label="pretto slider" />
      <p id="demo">value</p>
      <p>value: {value}</p>



      <ReplayFooter play={()=>play()} resume={()=>resume()} pause={()=>pause()} sliderChange={()=>sliderChange()}/>
    </div>
  );
};

export default LessonReplay;
