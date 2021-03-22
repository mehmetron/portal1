// @ts-nocheck
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import axios from 'axios';
import ProfileDetails from './components/ProfileDetails';
import GeneralSettings from './components/GeneralSettings';

const useStyles = makeStyles(() => ({
    root: {}
}));

export default function General(props) {
    const { className, ...rest } = props;

    const classes = useStyles();
    const [profile, setProfile] = useState({
        firstName: "Mehmet",
        lastName: "Turhan",
        state: "MN",
        country: "USA",
        timezone: "UTC"
    });



    if (!profile) {
        return null;
    }

    return (
        <Grid
            {...rest}
            className={clsx(classes.root, className)}
            container
            spacing={3}
        >
            <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
            >
                <ProfileDetails profile={profile} />
            </Grid>
            <Grid
                item
                lg={8}
                md={6}
                xl={9}
                xs={12}
            >
                <GeneralSettings profile={profile} />
            </Grid>
        </Grid>
    );
};


