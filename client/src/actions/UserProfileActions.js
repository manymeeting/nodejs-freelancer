import ClientAuthService from '../utils/ClientAuthService';

export const FETCH_USER_PROFILE_BEGIN   = 'FETCH_USER_PROFILE_BEGIN';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';

export const UPDATE_USER_PROFILE_BEGIN   = 'UPDATE_USER_PROFILE_BEGIN';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_FAILURE = 'UPDATE_USER_PROFILE_FAILURE';

export const UPDATE_USER_AVATAR_BEGIN   = 'UPDATE_USER_AVATAR_BEGIN';
export const UPDATE_USER_AVATAR_SUCCESS = 'UPDATE_USER_AVATAR_SUCCESS';
export const UPDATE_USER_AVATAR_FAILURE = 'UPDATE_USER_AVATAR_FAILURE';


// fetch profile
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


// update profile
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


// update avatar
export const updateUserAvatarBegin = () => ({
  type: UPDATE_USER_AVATAR_BEGIN
});

export const updateUserAvatarSuccess = data => ({
  type: UPDATE_USER_AVATAR_SUCCESS,
  payload: data

});

export const updateUserAvatarError = error => ({
  type: UPDATE_USER_AVATAR_FAILURE,
  payload: error
});

export function fetchUserProfile(id) {
	
	var clientAuthService = new ClientAuthService();

	return dispatch => {
		dispatch(fetchUserProfileBegin());
		return clientAuthService.fetch('/users/' + id + '/profile', {method: "GET"})
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
    dispatch(updateUserProfileBegin());
    return clientAuthService
          .fetch('/api_update_user?id=' + id, {
              method: "POST",
              body: JSON.stringify(newProfile)})
          .then(data => {
            dispatch(updateUserProfileSuccess(data));
            return true;
          })
          .catch(error => {
            dispatch(updateUserProfileError(error));
            throw error;  
          });
  }
}


export function updateUserAvatar(formData) {
  var clientAuthService = new ClientAuthService();
  
  return dispatch => {
    dispatch(updateUserAvatarBegin());
    return clientAuthService
          .fetch('/api_update_avatar', {
              method: "POST",
              body: formData}, true)
          .then(data => {
            dispatch(updateUserAvatarSuccess(data));
            return true;
          })
          .catch(error => {
            dispatch(updateUserAvatarError(error));
            throw error;  
          });
  }
}