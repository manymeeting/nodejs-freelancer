import {
  FETCH_PROJCET_BASIC_INFO_BEGIN,
  FETCH_PROJCET_BASIC_INFO_SUCCESS,
  FETCH_PROJCET_BASIC_INFO_FAILURE
} from '../actions/ProjectBasicInfoActions';

import {
  FETCH_PROJCET_BID_LIST_BEGIN,
  FETCH_PROJCET_BID_LIST_SUCCESS,
  FETCH_PROJCET_BID_LIST_FAILURE
} from '../actions/ProjectBidListActions'

const initialState = {
	basic: {},
  bids: [],
	loading: false,
	error: null
};


export default function ProjectDetailsReducer(state = initialState, action) {
  switch (action.type) {

  case FETCH_PROJCET_BASIC_INFO_BEGIN:
  	return {
		  ...state,
      loading: true,
      error: null
  	};
  case FETCH_PROJCET_BASIC_INFO_SUCCESS:
  	return {
  		...state,
  		loading: false,
  		basic: action.payload
  	};
  case FETCH_PROJCET_BASIC_INFO_FAILURE:
  	return {
      ...state,
      loading: false,
      error: action.payload
    };
  case FETCH_PROJCET_BID_LIST_BEGIN:
    return {
      ...state,
      loading: false,
      error: action.payload 
    };
  case FETCH_PROJCET_BID_LIST_SUCCESS:
    return {
      ...state,
      loading: false,
      bids: action.payload
    };
  case FETCH_PROJCET_BID_LIST_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload
    };
  default:
    return state;
  }
}