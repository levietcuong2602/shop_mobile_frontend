import axios from "axios";
import { alertMsg } from "./admin_actions";
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from "./types";
import { signUp, signIn } from "./../apis/users";
import { setToken } from "./../utils/auth";

export function signInUser({ email, passwd }) {
  return function(dispatch) {
    signIn({ email, passwd })
      .then((response) => {
        const { status, results, message } = response;
        if (status === 1) {
          setToken(results.token);
          dispatch(authUser(results));
        } else {
          dispatch(authError(message));
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch(authError("Invalid email or password."));
        }
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function authUser(userInfo) {
  localStorage.setItem("user", JSON.stringify(userInfo));
  return {
    type: AUTH_USER,
    payload: userInfo,
  };
}

export function signOutUser(history) {
  localStorage.removeItem("user");
  return function(dispatch) {
    dispatch({ type: UNAUTH_USER });
    dispatch(alertMsg("You are signed out!"));
    history.push("/user/signin");
  };
}

export function signUpUser({ full_name, email, passwd }) {
  return function(dispatch) {
    signUp({ full_name, email, passwd })
      .then((response) => {
        const { status, results, message } = response;
        if (status === 1) {
          setToken(results.token);
          dispatch({ type: AUTH_USER, payload: results });
        } else {
          dispatch(authError(message));
        }
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(authError("bad login info"));
      });
  };
}
