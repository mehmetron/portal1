// @ts-nocheck
import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { useSelector, useDispatch } from "react-redux";

import {
  Container,
  Grid,
  makeStyles,
  Typography,
  Hidden
} from '@material-ui/core';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import {RootState} from "../../store";
import {fetchCurrentUser} from "../sidebar/SidebarSlice";



const GridH = styled.div`
  display: flex;
`;



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Home = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  const currentUser = useSelector((state: RootState) => state.sidebar.user);

  return (
    <React.Fragment>
      <div style={{ margin: 50 }}></div>

      <Grid alignItems="center" container justify="space-between" spacing={3}>
        <Grid item md={6} xs={12}>
          <Typography component="h2" gutterBottom variant="overline">
            Portal
          </Typography>
          <Typography component="h1" gutterBottom variant="h3">
            Welcome back {" "}
            {currentUser && currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1)}!
            {/* {session.user.first_name} */}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            beep boop beep
          </Typography>

        </Grid>
        <Hidden smDown>
          <Grid item md={6}>
            <img
                alt="Cover"
                className={classes.image}
                // src='https://upthrust.eu/wp-content/uploads/2020/03/undraw_growth_analytics_8btt.png'
            />
          </Grid>
        </Hidden>
      </Grid>

      <div style={{ margin: 50 }}></div>

      <GridH>
        <Link
            css={css`
            text-decoration: none;
            color: #333;
            //flex: 1;
          `}
            to="/portal/enrolled/"
        >
          <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<MenuBookRoundedIcon/>}
          >
            Enrolled Courses
          </Button>
        </Link>
        <div style={{ margin: 10 }}></div>

        <Link
            css={css`
            text-decoration: none;
            color: #333;
            //flex: 1;
          `}
            to="/portal/boards/"
        >
          <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<CodeRoundedIcon/>}
          >
            Instructed Courses
          </Button>
        </Link>

      </GridH>



    </React.Fragment>
  );
};

export default Home;
