import axios from 'axios';
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from './actions';
import { DataService } from '../../config/dataService/dataService';

export const fetchUser = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER_REQUEST });

    try {
      const response = await DataService.get('auth/user');
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: FETCH_USER_FAILURE,
        payload: error.message
      });
    }
  };
};
