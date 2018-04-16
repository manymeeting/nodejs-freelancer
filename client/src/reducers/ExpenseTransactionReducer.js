import {
  FETCH_EXPENSE_TRANSACTION_BEGIN,
  FETCH_EXPENSE_TRANSACTION_SUCCESS,
  FETCH_EXPENSE_TRANSACTION_FAILURE
} from '../actions/ExpenseTransactionActions';


const initialState = {
	items: [],
	loading: false,
	error: null
};


export default function ExpenseTransactionReducer(state = initialState, action) {
  switch (action.type) {

  case FETCH_EXPENSE_TRANSACTION_BEGIN:
  	return {
  		...state,
      loading: true,
      error: null
  	}
  case FETCH_EXPENSE_TRANSACTION_SUCCESS:
  	return {
  		...state,
  		loading: false,
  		items: action.payload
  	};
  case FETCH_EXPENSE_TRANSACTION_FAILURE:
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