import ClientAuthService from '../utils/ClientAuthService';

export const HIRE_BID_BEGIN   = 'HIRE_BID_BEGIN';
export const HIRE_BID_SUCCESS = 'HIRE_BID_SUCCESS';
export const HIRE_BID_FAILURE = 'HIRE_BID_FAILURE';

export const hireBidBegin = () => ({
  type: HIRE_BID_BEGIN
});

export const hireBidSuccess = data => ({
  type: HIRE_BID_SUCCESS,
  payload: data
});

export const hireBidError = error => ({
  type: HIRE_BID_FAILURE,
  payload: error
});


export function hireBid(params) {
  
  var clientAuthService = new ClientAuthService();
  var params = {
    projectID: params.projectID,
    bidID: params.bidID
  }

  return dispatch => {
    dispatch(hireBidBegin());
    return clientAuthService.fetch('/api_hire_bid', {
            method: 'POST',
            body: JSON.stringify(params)
        })
      .then(data => {
            dispatch(hireBidSuccess({
              project_id: params.projectID,
              bid_id: data.insertID
            }));
            return true;
          })
          .catch(error => {
            dispatch(hireBidError(error));
            throw error;
          });
  }
}