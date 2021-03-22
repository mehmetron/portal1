import axios from "axios";
// import { logout } from "./features/auth/AuthSlice";

// Config global defaults for axios/django

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

console.log("document cookie: ", document.cookie);

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
export const API_LOGIN = "/portal/accounts/login/";
export const API_LOGOUT = "/portal/accounts/logout/";
export const API_REGISTER = "/portal/auth/registration/";
// export const API_LOGIN = "/portal/auth/login/";
// export const API_LOGOUT = "/portal/auth/logout/";
// export const API_REGISTER = "/portal/auth/registration/";
export const API_GUEST_REGISTER = "/portal/auth/guest/";
export const API_AUTH_SETUP = "/portal/auth/setup/";

export const API_AVATARS = "/portal/api/avatars/";
export const API_COURSES = "/portal/api/courses/";
export const API_COLUMNS = "/portal/api/columns/";
export const API_LESSONS = "/portal/api/lessons/";
export const API_LABELS = "/portal/api/labels/";
export const API_SORT_COLUMNS = "/portal/api/sort/column/";
export const API_SORT_TASKS = "/portal/api/sort/task/";
export const API_USERS = "/portal/api/users/";
export const API_SEARCH_USERS = "/portal/api/u/search/";
// Get current user
export const API_CURRENT_USER = "/portal/api/currentuser/";

export default axios;
