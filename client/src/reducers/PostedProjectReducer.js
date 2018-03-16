import {
  POST_PROJECT_BEGIN,
  POST_PROJECT_SUCCESS,
  POST_PROJECT_FAILURE
} from '../actions/BidOnProjectActions';


const initialState = {
  projects: [],
	loading: false,
	error: null
};

export default function PostedProjectReducer(state = initialState, action) {
  switch (action.type) {
  case POST_PROJECT_BEGIN:
  	return {
  		...state,
        loading: true,
        error: null
  	}
  case POST_PROJECT_SUCCESS:
  	return {
  		...state,
  		loading: false,
  		projects: state.projects.concat([action.payload])
  	};
  case POST_PROJECT_FAILURE:
  	return {
        ...state,
        loading: false,
        error: action.payload
    };
  default:
    return state;
  }
}