import ClientAuthService from '../utils/ClientAuthService';

export const FETCH_USER_INFO_BEGIN   = 'FETCH_USER_INFO_BEGIN';
export const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
export const FETCH_USER_INFO_FAILURE = 'FETCH_USER_INFO_FAILURE';

export const fetchUserInfoBegin = () => ({
  type: FETCH_USER_INFO_BEGIN
});

export const fetchUserInfoSuccess = data => ({
  type: FETCH_USER_INFO_SUCCESS,
  payload: data

});

export const fetchUserInfoError = error => ({
  type: FETCH_USER_INFO_FAILURE,
  payload: error
});


export function fetchUserInfo(id) {
	
	var clientAuthService = new ClientAuthService();

	return dispatch => {
		dispatch(fetchUserInfoBegin());
		return clientAuthService.fetch('/api_get_user?id=' + id, {method: "GET"})
			.then(data => {
		        dispatch(fetchUserInfoSuccess(data));
		        return true;
      		})
      		.catch(error => {
      			dispatch(fetchUserInfoError(error));
      			throw error;	
      		});
	}
}