import React from "react";
import { Switch, Route, RouteProps, useLocation } from "react-router-dom";
import styled from "@emotion/styled";

import Board from "./features/board";
import BoardList from "./features/board/BoardList";
import BoardEdit from "./features/board/BoardEdit";
import Navbar from "./components/Navbar";
import Home from "./features/home/Home";
import BoardBar from "./features/board/BoardBar";
import EnrolledList from "./features/enrolled/EnrolledList"

import Settings from "./features/settings/Settings"

// import LessonPage from "./features/lesson/LessonPage";
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
      {!location.pathname.includes("/portal/lesson/record") &&
      !location.pathname.includes("/portal/lesson/play") ? (
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
      {/* <AppRoute exact path="/portal/profile">
        <Profile />
      </AppRoute> */}
      <AppRoute exact path="/portal/boards">
        <BoardList />
      </AppRoute>

        <AppRoute exact path="/portal/enrolled">
            <EnrolledList />
        </AppRoute>

      <AppRoute exact path="/portal/b/:id">
        <BoardBar />
        <Board />
      </AppRoute>

      <AppRoute exact path="/portal/b/:id/edit">
        <BoardEdit />
      </AppRoute>

      <AppRoute exact path="/portal/home">
        <Home />
      </AppRoute>

      <AppRoute exact path="/portal/settings">
        <Settings />
      </AppRoute>



      <AppRoute exact path="/portal/lesson/play/:id">
        <LessonReplay />
      </AppRoute>

      <AppRoute exact path="/portal/lesson/record/:id">
        <LessonRecord />
      </AppRoute>

      {/* <Route path="*">
        <PageError>Page not found.</PageError>
      </Route> */}
    </Switch>
  );
};

export default AuthenticatedApp;
