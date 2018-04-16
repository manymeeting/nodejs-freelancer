import {
  FETCH_INCOME_TRANSACTION_BEGIN,
  FETCH_INCOME_TRANSACTION_SUCCESS,
  FETCH_INCOME_TRANSACTION_FAILURE
} from '../actions/IncomeTransactionActions';


const initialState = {
	items: [],
	loading: false,
	error: null
};


export default function IncomeTransactionReducer(state = initialState, action) {
  switch (action.type) {

  case FETCH_INCOME_TRANSACTION_BEGIN:
  	return {
  		...state,
      loading: true,
      error: null
  	}
  case FETCH_INCOME_TRANSACTION_SUCCESS:
  	return {
  		...state,
  		loading: false,
  		items: action.payload
  	};
  case FETCH_INCOME_TRANSACTION_FAILURE:
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