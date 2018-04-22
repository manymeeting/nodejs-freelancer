import ClientAuthService from '../utils/ClientAuthService';

export const MAKE_TRANSACTION_BEGIN   = 'MAKE_TRANSACTION_BEGIN';
export const MAKE_TRANSACTION_SUCCESS = 'MAKE_TRANSACTION_SUCCESS';
export const MAKE_TRANSACTION_FAILURE = 'MAKE_TRANSACTION_FAILURE';

export const FETCH_INCOME_TRANSACTION_BEGIN   = 'FETCH_INCOME_TRANSACTION_BEGIN';
export const FETCH_INCOME_TRANSACTION_SUCCESS = 'FETCH_INCOME_TRANSACTION_SUCCESS';
export const FETCH_INCOME_TRANSACTION_FAILURE = 'FETCH_INCOME_TRANSACTION_FAILURE';

export const FETCH_EXPENSE_TRANSACTION_BEGIN   = 'FETCH_EXPENSE_TRANSACTION_BEGIN';
export const FETCH_EXPENSE_TRANSACTION_SUCCESS = 'FETCH_EXPENSE_TRANSACTION_SUCCESS';
export const FETCH_EXPENSE_TRANSACTION_FAILURE = 'FETCH_EXPENSE_TRANSACTION_FAILURE';


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