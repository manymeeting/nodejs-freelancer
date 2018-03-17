import {
  FETCH_USER_PROFILE_BEGIN,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE

} from '../actions/UserProfileActions';


const initialState = {
	loading: false,
	error: null
};


export default function UserProfileReducer(state = initialState, action) {
  switch (action.type) {

  case FETCH_USER_PROFILE_BEGIN:
  	return {
  		...state,
      loading: true,
      error: null
  	}
  case FETCH_USER_PROFILE_SUCCESS:
  	return {
  		...state,
  		loading: false,
  		...action.payload
  	};
  case FETCH_USER_PROFILE_FAILURE:
  	return {
      ...state,
      loading: false,
      error: action.payload,
    };
  default:
    return state;
  }
}