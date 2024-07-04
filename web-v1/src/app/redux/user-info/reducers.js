import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from './actions';

const initialUser = {
  id: null,
  username: null,
  email: null,
  fullname: null,
  phone: null,
  role: {
      id: null,
      name: 'customer'
  },
  telegram_account: null,
  profileImage: null,
  coverImage: null
}

const initialState = {
  user: initialUser,
  status: 'idle',
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        status: 'loading'
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        user: action.payload
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
