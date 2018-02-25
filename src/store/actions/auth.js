import axios from 'axios';
import * as actionsTypes from './actionsTypes';

export const authStart = () => {
  return {
    type: actionsTypes.AUTH_START
  }
};

export const authSuccess = (authData) => {
  return {
    type: actionsTypes.AUTH_SUCCESS,
    authData: authData
  }
};

export const authFail = (error) => {
  return {
    type: actionsTypes.AUTH_FAIL,
    error: error
  }
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDLkVrk39RKgSo0vdKToyWcoqJGcTlBwR0';
    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDLkVrk39RKgSo0vdKToyWcoqJGcTlBwR0';
    }

    axios.post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error));
      })
  };
};