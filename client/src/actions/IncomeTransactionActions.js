import ClientAuthService from '../utils/ClientAuthService';

export const FETCH_INCOME_TRANSACTION_BEGIN   = 'FETCH_INCOME_TRANSACTION_BEGIN';
export const FETCH_INCOME_TRANSACTION_SUCCESS = 'FETCH_INCOME_TRANSACTION_SUCCESS';
export const FETCH_INCOME_TRANSACTION_FAILURE = 'FETCH_INCOME_TRANSACTION_FAILURE';

export const fetchIncomeTransactionBegin = () => ({
  type: FETCH_INCOME_TRANSACTION_BEGIN
});

export const fetchIncomeTransactionSuccess = projects => ({
  type: FETCH_INCOME_TRANSACTION_SUCCESS,
  payload: projects
});

export const fetchIncomeTransactionError = error => ({
  type: FETCH_INCOME_TRANSACTION_FAILURE,
  payload: error
});


export function fetchIncomeTransactions(id) {
	var clientAuthService = new ClientAuthService();

	return dispatch => {
		dispatch(fetchIncomeTransactionBegin());
		return clientAuthService.fetch('/transactions/users/' + id + '/income', {method: "GET"})
			.then(data => {
		        dispatch(fetchIncomeTransactionSuccess(data));
		        return true;
      		})
      		.catch(error => {
      			dispatch(fetchIncomeTransactionError(error));
      			throw error;	
      		});
	}
}