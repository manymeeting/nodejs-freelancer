import ClientAuthService from '../utils/ClientAuthService';

export const POST_SUBMISSION_BEGIN   = 'POST_SUBMISSION_BEGIN';
export const POST_SUBMISSION_SUCCESS = 'POST_SUBMISSION_SUCCESS';
export const POST_SUBMISSION_FAILURE = 'POST_SUBMISSION_FAILURE';

export const postSubmissionBegin = () => ({
  type: POST_SUBMISSION_BEGIN
});

export const postSubmissionSuccess = data => ({
  type: POST_SUBMISSION_SUCCESS,
  payload: data
});

export const postSubmissionError = error => ({
  type: POST_SUBMISSION_FAILURE,
  payload: error
});

// return inserted project id on success
export function postSubmission(formData) {
	var clientAuthService = new ClientAuthService();
	return dispatch => {
		dispatch(postSubmissionBegin());
		return clientAuthService.fetch('/projects/submission', {
		        method: 'POST',
		        body: formData
	    	}, true)
			.then(data => {
		        dispatch(postSubmissionSuccess(data));
		        return data;
      		})
      		.catch(error => {
      			dispatch(postSubmissionError(error));
      			throw error;
      		});
	}
}