import ClientAuthService from '../utils/ClientAuthService';

export const MAKE_TRANSACTION_BEGIN   = 'MAKE_TRANSACTION_BEGIN';
export const MAKE_TRANSACTION_SUCCESS = 'MAKE_TRANSACTION_SUCCESS';
export const MAKE_TRANSACTION_FAILURE = 'MAKE_TRANSACTION_FAILURE';

export const makeTransactionBegin = () => ({
  type: MAKE_TRANSACTION_BEGIN
});

export const makeTransactionSuccess = projects => ({
  type: MAKE_TRANSACTION_SUCCESS,
  payload: projects
});

export const makeTransactionError = error => ({
  type: MAKE_TRANSACTION_FAILURE,
  payload: error
});


export function makeTransaction(params) {
	var clientAuthService = new ClientAuthService();
  var params = {
    transFrom: params.transFrom,
    transTo: params.transTo,
    transAmount: params.transAmount,
    transForProject: params.transForProject,
    transDate: params.transDate
  };

  return dispatch => {
    dispatch(makeTransactionBegin());
    return clientAuthService.fetch('/transactions', {
            method: 'POST',
            body: JSON.stringify(params)
        })
        .then(data => {
          dispatch(makeTransactionSuccess(data));
          return true;
        })
        .catch(error => {
          dispatch(makeTransactionError(error));
          throw error;
        });
  }
}