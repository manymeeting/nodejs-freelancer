import ClientAuthService from '../utils/ClientAuthService';

export const VALIDATE_USER_BEGIN   = 'VALIDATE_USER_BEGIN';
export const VALIDATE_USER_SUCCESS = 'VALIDATE_USER_SUCCESS';
export const VALIDATE_USER_FAILURE = 'VALIDATE_USER_FAILURE';

export const validateUserBegin = () => ({
  type: VALIDATE_USER_BEGIN
});

export const validateUserSuccess = projects => ({
  type: VALIDATE_USER_SUCCESS,
  payload: projects
});

export const validateUserError = error => ({
  type: VALIDATE_USER_FAILURE,
  payload: error
});


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