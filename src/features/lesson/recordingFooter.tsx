import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import AlbumIcon from '@material-ui/icons/Album';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';

import { useParams, useHistory } from "react-router-dom";


const useStyles = makeStyles({
    root: {
        position: "fixed",
        bottom: 0,
        width: "100%"
    },
});

interface Props {
    onSave: () => ((event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void) | undefined;
}

export default function RecordingFooter(props: Props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    let history = useHistory();

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Back" icon={<ArrowLeftRoundedIcon color="primary" fontSize="large" onClick={() => history.goBack()}/>} />
            <BottomNavigationAction label="Record" icon={<AlbumIcon color="primary"/>} />
            <BottomNavigationAction label="Mic" icon={<MicRoundedIcon color="primary"/>} />
            <BottomNavigationAction label="Play" icon={<PlayArrowRoundedIcon color="primary" onClick={()=>props.onSave()}/>} />
        </BottomNavigation>
    );
}
