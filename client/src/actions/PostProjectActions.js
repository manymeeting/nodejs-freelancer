import ClientAuthService from '../utils/ClientAuthService';

export const POST_PROJECT_BEGIN   = 'POST_PROJECT_BEGIN';
export const POST_PROJECT_SUCCESS = 'POST_PROJECT_SUCCESS';
export const POST_PROJECT_FAILURE = 'POST_PROJECT_FAILURE';

export const postProjectBegin = () => ({
  type: POST_PROJECT_BEGIN
});

export const postProjectSuccess = data => ({
  type: POST_PROJECT_SUCCESS,
  payload: data
});

export const postProjectError = error => ({
  type: POST_PROJECT_FAILURE,
  payload: error
});

// return inserted project id on success
export function postProject(formData) {
	var clientAuthService = new ClientAuthService();
	return dispatch => {
		dispatch(postProjectBegin());
		return clientAuthService.fetch('/projects', {
		        method: 'POST',
		        body: formData
	    	}, true)
			.then(data => {
		        dispatch(postProjectSuccess(data));
		        return data._id;
      		})
      		.catch(error => {
      			dispatch(postProjectError(error));
      			throw error;
      		});
	}
}