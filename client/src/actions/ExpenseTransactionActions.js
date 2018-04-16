import ClientAuthService from '../utils/ClientAuthService';

export const FETCH_EXPENSE_TRANSACTION_BEGIN   = 'FETCH_EXPENSE_TRANSACTION_BEGIN';
export const FETCH_EXPENSE_TRANSACTION_SUCCESS = 'FETCH_EXPENSE_TRANSACTION_SUCCESS';
export const FETCH_EXPENSE_TRANSACTION_FAILURE = 'FETCH_EXPENSE_TRANSACTION_FAILURE';

export const fetchExpenseTransactionBegin = () => ({
  type: FETCH_EXPENSE_TRANSACTION_BEGIN
});

export const fetchExpenseTransactionSuccess = projects => ({
  type: FETCH_EXPENSE_TRANSACTION_SUCCESS,
  payload: projects
});

export const fetchExpenseTransactionError = error => ({
  type: FETCH_EXPENSE_TRANSACTION_FAILURE,
  payload: error
});


export function fetchExpenseTransactions(id) {
	var clientAuthService = new ClientAuthService();

	return dispatch => {
		dispatch(fetchExpenseTransactionBegin());
		return clientAuthService.fetch('/transactions/users/' + id + '/expense', {method: "GET"})
			.then(data => {
		        dispatch(fetchExpenseTransactionSuccess(data));
		        return true;
      		})
      		.catch(error => {
      			dispatch(fetchExpenseTransactionError(error));
      			throw error;	
      		});
	}
}