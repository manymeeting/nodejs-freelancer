import ClientAuthService from '../utils/ClientAuthService';

export const UPDATE_STATUS_BEGIN   = 'UPDATE_STATUS_BEGIN';
export const UPDATE_STATUS_SUCCESS = 'UPDATE_STATUS_SUCCESS';
export const UPDATE_STATUS_FAILURE = 'UPDATE_STATUS_FAILURE';

export const updateProjStatusBegin = () => ({
  type: UPDATE_STATUS_BEGIN
});

export const updateProjStatusSuccess = data => ({
  type: UPDATE_STATUS_SUCCESS,
  payload: data
});

export const updateProjStatusError = error => ({
  type: UPDATE_STATUS_FAILURE,
  payload: error
});


export function updateProjStatus(id, status) {
  var clientAuthService = new ClientAuthService();
  
  return dispatch => {
    dispatch(updateProjStatusBegin());
    return clientAuthService.fetch('/projects/' + id + '/status/' + status, {
            method: 'PUT'
        })
        .then(data => {
          dispatch(updateProjStatusSuccess(data));
          return true;
        })
        .catch(error => {
          dispatch(updateProjStatusError(error));
          throw error;
        });
  }
}
