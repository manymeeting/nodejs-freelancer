import {
  FETCH_ALL_PUBLISHED_PROJECT_BEGIN,
  FETCH_ALL_PUBLISHED_PROJECT_SUCCESS,
  FETCH_ALL_PUBLISHED_PROJECT_FAILURE
} from '../actions/AllPublishedProjectActions';


const initialState = {
	items: [],
	loading: false,
	error: null
};


export default function AllPublishedProjReducer(state = initialState, action) {
  switch (action.type) {

  case FETCH_ALL_PUBLISHED_PROJECT_BEGIN:
  	return {
  		...state,
      loading: true,
      error: null
  	}
  case FETCH_ALL_PUBLISHED_PROJECT_SUCCESS:
  	return {
  		...state,
  		loading: false,
  		items: action.payload
  	};
  case FETCH_ALL_PUBLISHED_PROJECT_FAILURE:
  	return {
      ...state,
      loading: false,
      error: action.payload,
      items: []
    };
  default:
    return state;
  }
}