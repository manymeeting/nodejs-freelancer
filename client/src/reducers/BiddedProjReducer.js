import {
  ADD_BID_ON_PROJECT_BEGIN,
  ADD_BID_ON_PROJECT_SUCCESS,
  ADD_BID_ON_PROJECT_FAILURE
} from '../actions/BidOnProjectActions';


const initialState = {
  bids: [],
	loading: false,
	error: null
};

export default function BiddedProjReducer(state = initialState, action) {
  switch (action.type) {
  case ADD_BID_ON_PROJECT_BEGIN:
  	return {
  		...state,
        loading: true,
        error: null
  	}
  case ADD_BID_ON_PROJECT_SUCCESS:
  	return {
  		...state,
  		loading: false,
  		bids: state.bids.concat([action.payload])
  	};
  case ADD_BID_ON_PROJECT_FAILURE:
  	return {
        ...state,
        loading: false,
        error: action.payload
    };
  default:
    return state;
  }
}