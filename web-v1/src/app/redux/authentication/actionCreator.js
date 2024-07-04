import Cookies from 'js-cookie';
import actions from './actions';
import axios from 'axios';
import { DataService } from '../../config/dataService/dataService';
import { getItem } from '../../utility/function/localStorageControl';
import { FETCH_USER_SUCCESS } from '../user-info/actions';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/api`;

const login = (values, callback) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      // const response = await DataService.post('auth/users/login', values);
      const response = await axios.post(`${API_ENDPOINT}/auth/users/login` , values ,{headers: {'Content-Type': 'application/json'}});
      if (response.status === 200) {
        Cookies.set('access_token', response.data.access_token);
        Cookies.set('refresh_token', response.data.refresh_token);
        Cookies.set('logedIn', true);

        // =============> Save User Info to Local Storage <=============
        // localStorage.setItem("user", JSON.stringify(response.data.user))
        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: response.data.user
        });

        dispatch(loginSuccess(true));
        callback();
      }
    } catch (err) {
      dispatch(loginErr(err.response));
      throw err
    }
  };
};

const register = (values) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      const response = await axios.post(`${API_ENDPOINT}/auth/users/register`, values, {headers: {'Content-Type': 'application/json'}});
      // ================== Save user info to globle variable ==================
      console.log(response.data)
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: response.data
      });

      dispatch(loginSuccess(false));
      return response
    } catch (err) {
      dispatch(loginErr(err));
      throw err
    }
  };
};


const logOut = (callback) => {
  return async (dispatch) => {
    dispatch(logoutBegin());
    try {
      Cookies.remove('logedIn');
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      localStorage.removeItem('user')
      dispatch(logoutSuccess(false));
      callback();
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

const refreshToken = async () => {
  try {
    const refresh = getItem('refresh_token')
    const response = await DataService.post('/auth/refresh_token', {refresh})
    if (response.status === 200) {
      Cookies.set('access_token', response.data.access);
      Cookies.set('logedIn', true);
    }
  } catch (error) {
  }
}

const isUsernameExist = async (values) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/auth/user/is_username_exist/${values}`); 
      return response.data.is_username_exist
    } catch (err) {
      throw err
    }
  };

export { login, logOut, register, refreshToken, isUsernameExist };
