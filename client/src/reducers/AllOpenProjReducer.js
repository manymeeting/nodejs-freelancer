import {
  FETCH_ALL_OPEN_PROJECTS_BEGIN,
  FETCH_ALL_OPEN_PROJECTS_SUCCESS,
  FETCH_ALL_OPEN_PROJECTS_FAILURE
} from '../actions/AllOpenProjectActions';


const initialState = {
	items: [],
	loading: false,
	error: null
};


export default function AllOpenProjReducer(state = initialState, action) {
  switch (action.type) {

  case FETCH_ALL_OPEN_PROJECTS_BEGIN:
  	return {
  		...state,
        loading: true,
        error: null
  	}
  case FETCH_ALL_OPEN_PROJECTS_SUCCESS:
  	return {
  		...state,
  		loading: false,
  		items: action.payload
  	};
  case FETCH_ALL_OPEN_PROJECTS_FAILURE:
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