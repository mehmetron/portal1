import React from "react";
import { Switch, Route, RouteProps, useLocation } from "react-router-dom";
import styled from "@emotion/styled";

import Board from "./features/board";
import BoardList from "./features/board/BoardList";
import BoardEdit from "./features/board/BoardEdit";
import Navbar from "./components/Navbar";
import Home from "./features/home/Home";
import BoardBar from "./features/board/BoardBar";
import LessonPage from "./features/lesson/LessonPage";
import LessonReplay from "./features/lesson/LessonReplay";
import LessonRecord from "./features/lesson/LessonRecord";
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
  const location = useLocation();

  return (
    <>
      {!location.pathname.includes("/kafka/lesson/record") &&
      !location.pathname.includes("/kafka/lesson/play") ? (
        <>
          <Sidebar />
          <Main theme={theme}>
            <Navbar />
            {children}
          </Main>
        </>
      ) : (
        <div>{children}</div>
      )}
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

      <AppRoute exact path="/kafka/b/:id/edit">
        <BoardEdit />
      </AppRoute>

      <AppRoute exact path="/kafka/home">
        <Home />
      </AppRoute>

      <AppRoute exact path="/kafka/lesson">
        <LessonPage />
      </AppRoute>

      <AppRoute exact path="/kafka/lesson/play/:id">
        <LessonReplay />
      </AppRoute>

      <AppRoute exact path="/kafka/lesson/record/:id">
        <LessonRecord />
      </AppRoute>

      {/* <Route path="*">
        <PageError>Page not found.</PageError>
      </Route> */}
    </Switch>
  );
};

export default AuthenticatedApp;
