import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { ReactComponent as Hero } from "../../static/svg/thoughts.svg";
import { css } from "@emotion/core";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Enrolled = styled.div`
  background-color: gray;
  color: white;
  font-size: 24px;
  border-radius: 4px;
  padding: 10px;
`;

const Instruct = styled.div`
  background-color: green;
  color: white;
  font-size: 24px;
  border-radius: 4px;
  padding: 10px;
`;

const Grid = styled.div`
  display: flex;
`;

const HeroContainer = styled.div``;

const Home = () => {
  return (
    <React.Fragment>
      <div style={{ margin: 50 }}></div>
      <Grid>
        <Link
          css={css`
            text-decoration: none;
            color: #333;
            flex: 1;
          `}
          to="/kafka/boards/"
        >
          <Enrolled>Enrolled Courses</Enrolled>
        </Link>

        <Link
          css={css`
            text-decoration: none;
            color: #333;
            flex: 1;
          `}
          to="/kafka/boards/"
        >
          <Instruct>Instructed Courses</Instruct>
        </Link>
      </Grid>
      <Container>
        <HeroContainer>
          <Hero width={260} height={260} />
        </HeroContainer>

        <Link
          css={css`
            text-decoration: none;
            color: #333;
          `}
          to="/kafka/boards/"
        >
          <Button
            color="primary"
            variant="contained"
            style={{ textTransform: "none" }}
          >
            View Boards
          </Button>
        </Link>
        <br></br>
        <Link
          css={css`
            text-decoration: none;
            color: #333;
          `}
          to="/kafka/boards/"
        >
          <Button
            color="primary"
            variant="contained"
            style={{ textTransform: "none" }}
          >
            View Lessons
          </Button>
        </Link>
      </Container>
    </React.Fragment>
  );
};

export default Home;
