import axios from "axios";
// import { logout } from "./features/auth/AuthSlice";

// Config global defaults for axios/django

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export const setupInterceptors = (store: any) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle expired sessions
      if (error.response && error.response.status === 401) {
        console.log("401 error. Unauthenticated I think broski");
        // store.dispatch(logout());
      }
      return Promise.reject(error);
    }
  );
};

// Available endpoints
export const API_LOGIN = "/kafka/accounts/login/";
export const API_LOGOUT = "/kafka/accounts/logout/";
export const API_REGISTER = "/kafka/auth/registration/";
// export const API_LOGIN = "/kafka/auth/login/";
// export const API_LOGOUT = "/kafka/auth/logout/";
// export const API_REGISTER = "/kafka/auth/registration/";
export const API_GUEST_REGISTER = "/kafka/auth/guest/";
export const API_AUTH_SETUP = "/kafka/auth/setup/";

export const API_AVATARS = "/kafka/api/avatars/";
export const API_BOARDS = "/kafka/api/boards/";
export const API_COLUMNS = "/kafka/api/columns/";
export const API_TASKS = "/kafka/api/tasks/";
export const API_LABELS = "/kafka/api/labels/";
export const API_SORT_COLUMNS = "/kafka/api/sort/column/";
export const API_SORT_TASKS = "/kafka/api/sort/task/";
export const API_USERS = "/kafka/api/users/";
export const API_SEARCH_USERS = "/kafka/api/u/search/";

export default axios;
