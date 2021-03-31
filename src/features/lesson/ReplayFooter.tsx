import React, { useState } from 'react';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import {Tooltip} from "@material-ui/core";

import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';

import { useParams, useHistory } from "react-router-dom";


import * as rrweb from "rrweb";



const useStyles = makeStyles({
    root: {
        position: "fixed",
        bottom: 0,
        width: "100%"
    },
});

interface Props {
    play: any;
    resume: any;
    pause: any;
    sliderChange: any;
}



export const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

export default function RecordingFooter(props: Props) {
    const classes = useStyles();
    // const [value, setValue] = useState(0);
    const [playing, setPlaying] = useState(false);

    // const handleChange = (event: any, newValue: number | number[]) => {
    //     console.log("new Valuee", newValue)
    //     console.log("new event", event)
    //     setValue(newValue as number);
    // };

    let history = useHistory();




    function play(){
        setPlaying(true)
        console.log("now playing")
        props.play()
    }

    function pause(){
        setPlaying(false)
        console.log("now paused")
        props.pause()
    }

    function resume(){
        setPlaying(true)
        console.log("now resumed")
        props.resume()
    }

    return (
        // <BottomNavigation
        //     value={value}
        //     onChange={(event, newValue) => {
        //         setValue(newValue);
        //     }}
        //     showLabels
        //     className={classes.root}
        // >
        <div>
            <Tooltip
                title="return to course page"
                placement="right-end"
                arrow
            >
                <BottomNavigationAction icon={<ArrowLeftRoundedIcon color="primary" style={{ fontSize: 50 }} onClick={() => history.goBack()}/>} />
            </Tooltip>
            {/*<PrettoSlider id="myRange" min={0} max={100} value={value} onChange={handleChange} onChangeCommitted={()=>{props.sliderChange()}} valueLabelDisplay="off" aria-label="pretto slider" />*/}
            {/*<p id="demo">value</p>*/}

            <BottomNavigationAction label="play" icon={<PlayArrowRoundedIcon color="primary" style={{ fontSize: 40 }} onClick={()=>play()}/>} />
            <BottomNavigationAction label="pause" icon={<PauseRoundedIcon color="primary" style={{ fontSize: 40 }} onClick={()=>pause()}/>} />
            <BottomNavigationAction label="resume" icon={<PlayArrowRoundedIcon color="primary" style={{ fontSize: 40 }} onClick={()=>resume()}/>} />

            {/*{ playing ?*/}
            {/*    <BottomNavigationAction icon={<PauseRoundedIcon color="primary" style={{ fontSize: 40 }} onClick={()=>pause()}/>} />*/}
            {/*    :*/}
            {/*    <BottomNavigationAction icon={<PlayArrowRoundedIcon color="primary" style={{ fontSize: 40 }} onClick={()=>play()}/>} />*/}
            {/*}*/}
        {/*</BottomNavigation>*/}
        </div>
    );
}
