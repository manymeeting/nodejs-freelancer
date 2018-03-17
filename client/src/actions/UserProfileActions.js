import ClientAuthService from '../utils/ClientAuthService';

export const FETCH_USER_PROFILE_BEGIN   = 'FETCH_USER_PROFILE_BEGIN';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';

export const fetchUserProfileBegin = () => ({
  type: FETCH_USER_PROFILE_BEGIN
});

export const fetchUserProfileSuccess = data => ({
  type: FETCH_USER_PROFILE_SUCCESS,
  payload: data

});

export const fetchUserProfileError = error => ({
  type: FETCH_USER_PROFILE_FAILURE,
  payload: error
});


export function fetchUserProfile(id) {
	
	var clientAuthService = new ClientAuthService();

	return dispatch => {
		dispatch(fetchUserProfileBegin());
		return clientAuthService.fetch('/api_get_profile?id=' + id, {method: "GET"})
			.then(data => {
		        dispatch(fetchUserProfileSuccess(data));
		        return true;
      		})
      		.catch(error => {
      			dispatch(fetchUserProfileError(error));
      			throw error;	
      		});
	}
}