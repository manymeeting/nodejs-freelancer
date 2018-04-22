import ClientAuthService from '../utils/ClientAuthService';

export const HIRE_BID_BEGIN   = 'HIRE_BID_BEGIN';
export const HIRE_BID_SUCCESS = 'HIRE_BID_SUCCESS';
export const HIRE_BID_FAILURE = 'HIRE_BID_FAILURE';

export const SEND_NOTIFICATION_BEGIN   = 'SEND_NOTIFICATION_BEGIN';
export const SEND_NOTIFICATION_SUCCESS = 'SEND_NOTIFICATION_SUCCESS';
export const SEND_NOTIFICATION_FAILURE = 'SEND_NOTIFICATION_FAILURE';

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

export const sendNotificationBegin = () => ({
  type: SEND_NOTIFICATION_BEGIN
});

export const sendNotificationSuccess = data => ({
  type: SEND_NOTIFICATION_SUCCESS,
  payload: data
});

export const sendNotificationError = error => ({
  type: SEND_NOTIFICATION_FAILURE,
  payload: error
});

export function sendNotification(params) {
  var clientAuthService = new ClientAuthService();
  var params = {
    bidderID: params.bidderID
  }

  return dispatch => {
    dispatch(sendNotificationBegin());
    return clientAuthService.fetch('/projects/notification/hire', {
            method: 'POST',
            body: JSON.stringify(params)
        })
        .then(data => {
          dispatch(sendNotificationSuccess(data));
          return true;
        })
        .catch(error => {
          dispatch(sendNotificationError(error));
          throw error;
        });
  }
}

export function hireBid(params) {
  
  var clientAuthService = new ClientAuthService();
  var params = {
    projectID: params.projectID,
    bidID: params.bidID
  }

  return dispatch => {
    dispatch(hireBidBegin());
    return clientAuthService.fetch('/projects/' + params.projectID + '/hire/' + params.bidID, {
            method: 'PUT',
            body: JSON.stringify(params)
        })
        .then(data => {
          dispatch(hireBidSuccess({
            project_id: params.projectID
          }));
          return true;
        })
        .catch(error => {
          dispatch(hireBidError(error));
          throw error;
        });
  }
}