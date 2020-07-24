import React from "react";
import { Switch, Route, RouteProps } from "react-router-dom";
import styled from "@emotion/styled";

import Board from "./features/board";
import BoardList from "./features/board/BoardList";
import Navbar from "./components/Navbar";
import Home from "./features/home/Home";
import BoardBar from "./features/board/BoardBar";
import LessonPage from "./features/lesson/LessonPage";
// import Profile from "./features/profile/Profile";
import Sidebar from "./features/sidebar/Sidebar";
// import PageError from "./components/PageError";
import { sidebarWidth } from "./const";
import { useTheme, WithTheme } from "@material-ui/core";

const Main = styled.div<WithTheme>`
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-left: ${sidebarWidth + 8}px;
  }
`;

const Wrapper: React.FC = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Sidebar />
      <Main theme={theme}>
        <Navbar />
        {children}
      </Main>
    </>
  );
};

const AppRoute = (props: RouteProps) => (
  <Route {...props}>
    <Wrapper>{props.children}</Wrapper>
  </Route>
);

const AuthenticatedApp = () => {
  return (
    <Switch>
      {/* <AppRoute exact path="/kafka/profile">
        <Profile />
      </AppRoute> */}
      <AppRoute exact path="/kafka/boards">
        <BoardList />
      </AppRoute>
      <AppRoute exact path="/kafka/b/:id">
        <BoardBar />
        <Board />
      </AppRoute>

      <AppRoute exact path="/kafka/home">
        <Home />
      </AppRoute>

      <AppRoute exact path="/kafka/lesson">
        <LessonPage />
      </AppRoute>
      {/* <Route path="*">
        <PageError>Page not found.</PageError>
      </Route> */}
    </Switch>
  );
};

export default AuthenticatedApp;
