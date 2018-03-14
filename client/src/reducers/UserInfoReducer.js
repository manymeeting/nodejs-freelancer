import {
  FETCH_USER_INFO_BEGIN,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE

} from '../actions/UserInfoActions';


const initialState = {
	loading: false,
	error: null
};


export default function UserInfoReducer(state = initialState, action) {
  switch (action.type) {

  case FETCH_USER_INFO_BEGIN:
  	return {
  		...state,
      loading: true,
      error: null
  	}
  case FETCH_USER_INFO_SUCCESS:
  	return {
  		...state,
  		loading: false,
  		...action.payload
  	};
  case FETCH_USER_INFO_FAILURE:
  	return {
      ...state,
      loading: false,
      error: action.payload,
    };
  default:
    return state;
  }
}