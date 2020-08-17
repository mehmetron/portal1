// import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import Lesson from "./testcomponents/Lesson";
// import Save from "./testcomponents/Save";
// import Dashboard from "./testcomponents/Dashboard";

// // Resource where I learned tricks for reloading/rerendering site in browser on link click
// // https://github.com/ReactTraining/react-router/issues/3109
// export default function App() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/kafka/dashboard">Dashboard</Link>
//             </li>
//             <li>
//               <Link to="/kafka/lesson">Lesson #</Link>
//             </li>
//             <li>
//               <Link to="/kafka/save">Save</Link>
//             </li>
//             <li>
//               <Link to="/kafka/dashboard/save">Dashboard/Save</Link>
//             </li>
//             <li>
//               <Link to="/kafka/about" target="_self">
//                 About! - throught Link with target
//               </Link>
//             </li>
//             <li>
//               <a href="/kafka/about">About! - through a tag</a>
//             </li>
//             <li>
//               <a href="/kafka/about" target="_blank" rel="noopener noreferrer">
//                 <p>go to my server route, not a react route</p>
//               </a>
//             </li>
//             <li>
//               <a href="/kafka/about">
//                 <p>
//                   go to my server route, not a react route -- took out target
//                   and rel
//                 </p>
//               </a>
//             </li>
//           </ul>
//         </nav>

//         {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//         <Switch>
//           <Route path="/kafka/dashboard/save">
//             <Save />
//           </Route>
//           <Route path="/kafka/dashboard">
//             <Dashboard />
//           </Route>
//           <Route path="/kafka/lesson">
//             <Lesson />
//           </Route>
//           <Route path="/kafka/save">
//             <Save />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

import React, { useEffect, Suspense } from "react";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import { Global, css } from "@emotion/core";

import FullPageSpinner from "./components/FullPageSpinner";
import Toast from "./features/toast/Toast";
import { theme } from "./const";
import store, { RootState } from "./store";
import { FOCUS_BOX_SHADOW } from "./utils/colors";

const loadAuthenticatedApp = () => import("./AuthenticatedApp");
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
// const UnauthenticatedApp = React.lazy(() => import("./features/auth/Auth"));

const AuthWrapper = () => {
  // const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    // Preload the AuthenticatedApp
    // while the user is logging in
    loadAuthenticatedApp();
  }, []);

  return (
    <Suspense fallback={<FullPageSpinner />}>
      {/* {user ? <AuthenticatedApp key={user.id} /> : <UnauthenticatedApp />} */}
      <AuthenticatedApp />
    </Suspense>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthWrapper />
          <Toast />
          <Global
            styles={css`
              .Mui-focusVisible {
                box-shadow: 0 0 3px 2px ${FOCUS_BOX_SHADOW};
              }
              textarea {
                font-family: inherit;
              }
            `}
          />
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;
