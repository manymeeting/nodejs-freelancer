import ClientAuthService from '../utils/ClientAuthService';

export const FETCH_USER_PROFILE_BEGIN   = 'FETCH_USER_PROFILE_BEGIN';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';

export const UPDATE_USER_PROFILE_BEGIN   = 'UPDATE_USER_PROFILE_BEGIN';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_FAILURE = 'UPDATE_USER_PROFILE_FAILURE';


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

export const updateUserProfileBegin = () => ({
  type: UPDATE_USER_PROFILE_BEGIN
});

export const updateUserProfileSuccess = data => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  payload: data

});

export const updateUserProfileError = error => ({
  type: UPDATE_USER_PROFILE_FAILURE,
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


export function updateUserProfile(id, params) {
  var clientAuthService = new ClientAuthService();
  var newProfile = {
      userID: id,
      userName: params.userName,
      userEmail: params.userEmail,
      userPhone: params.userPhone,
      userAbout: params.userAbout,
      userSkills: params.userSkills
    };
  return dispatch => {
    dispatch(fetchUserProfileBegin());
    return clientAuthService
          .fetch('/api_update_user?id=' + id, {
              method: "POST",
              body: JSON.stringify(newProfile)})
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