import ClientAuthService from '../utils/ClientAuthService';

export const MAKE_PAYMENT_BEGIN   = 'MAKE_PAYMENT_BEGIN';
export const MAKE_PAYMENT_SUCCESS = 'MAKE_PAYMENT_SUCCESS';
export const MAKE_PAYMENT_FAILURE = 'MAKE_PAYMENT_FAILURE';

export const makePaymentBegin = () => ({
  type: MAKE_PAYMENT_BEGIN
});

export const makePaymentSuccess = data => ({
  type: MAKE_PAYMENT_SUCCESS,
  payload: data
});

export const makePaymentError = error => ({
  type: MAKE_PAYMENT_FAILURE,
  payload: error
});


export function makePayment(params) {
  
  var clientAuthService = new ClientAuthService();
  var params = {
    transFrom: params.transFrom,
    transTo: params.transTo,
    transAmount: params.transAmount,
    transForProject: params.transForProject,
    transDate: params.transDate
  };

  return dispatch => {
    dispatch(makePaymentBegin());
    return clientAuthService.fetch('/transactions', {
            method: 'POST',
            body: JSON.stringify(params)
        })
        .then(data => {
			dispatch(makePaymentSuccess(data));
			return true;
        })
        .catch(error => {
			dispatch(makePaymentError(error));
			throw error;
        });
  }
}