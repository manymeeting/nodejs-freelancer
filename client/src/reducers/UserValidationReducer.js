import {
  VALIDATE_USER_BEGIN,
  VALIDATE_USER_SUCCESS,
  VALIDATE_USER_FAILURE,
  INVALIDATE_USER_SUCCESS

} from '../actions/ValidateUserActions';


const initialState = {
	loading: false,
	error: null,
  isLoggedIn: false
};


export default function UserValidationReducer(state = initialState, action) {
  switch (action.type) {

  case VALIDATE_USER_BEGIN:
  	return {
  		...state,
      loading: true,
      error: null
  	}
  case VALIDATE_USER_SUCCESS:
  	return {
  		...state,
  		loading: false,
  		isLoggedIn: true
  	};
  case VALIDATE_USER_FAILURE:
  	return {
      ...state,
      loading: false,
      error: action.payload,
      isLoggedIn: false
    };
  case INVALIDATE_USER_SUCCESS:
    return {
      ...state,
      isLoggedIn: false
    }
  default:
    return state;
  }
}