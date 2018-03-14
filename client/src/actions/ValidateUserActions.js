import ClientAuthService from '../utils/ClientAuthService';

export const VALIDATE_USER_BEGIN   = 'VALIDATE_USER_BEGIN';
export const VALIDATE_USER_SUCCESS = 'VALIDATE_USER_SUCCESS';
export const VALIDATE_USER_FAILURE = 'VALIDATE_USER_FAILURE';
export const INVALIDATE_USER_SUCCESS = 'INVALIDATE_USER_SUCCESS';

export const validateUserBegin = () => ({
  type: VALIDATE_USER_BEGIN
});

export const validateUserSuccess = data => ({
  type: VALIDATE_USER_SUCCESS,
  payload: data
});

export const validateUserError = error => ({
  type: VALIDATE_USER_FAILURE,
  payload: error
});

export const invalidateUserSuccess = data => ({
  type: INVALIDATE_USER_SUCCESS,
  payload: null
});

export function invalidateUser(history) {
	var clientAuthService = new ClientAuthService();

	return dispatch => {
		clientAuthService.logout();
		// redirect to home page
		dispatch(invalidateUserSuccess());
	    history.push("/login");
	};
}

export function validateUser(email, password, history) {
	
	var clientAuthService = new ClientAuthService();

	return dispatch => {
		dispatch(validateUserBegin());
		clientAuthService.fetch('/api_auth_user', {
	        method: 'POST',
	        body: JSON.stringify({
	            email,
	            password
	        })
	    }).then(data => {
	        console.log("Login Success!");
	        // set token into localstorage for client auth services
	        clientAuthService.login(data.token);
	        // update login data in redux state 
	        dispatch(validateUserSuccess(data));
	        // redirect to home page
	        history.push("/home");
	    }).catch(error => {
	        console.log("Login Failed: " + error);
	    	error => dispatch(validateUserError(error))
	    });
	}
}