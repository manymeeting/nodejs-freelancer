import ClientAuthService from '../utils/ClientAuthService';

export const FETCH_ALL_PUBLISHED_PROJECT_BEGIN   = 'FETCH_ALL_PUBLISHED_PROJECT_BEGIN';
export const FETCH_ALL_PUBLISHED_PROJECT_SUCCESS = 'FETCH_ALL_PUBLISHED_PROJECT_SUCCESS';
export const FETCH_ALL_PUBLISHED_PROJECT_FAILURE = 'FETCH_ALL_PUBLISHED_PROJECT_FAILURE';

export const fetchAllPublishedProjectBegin = () => ({
  type: FETCH_ALL_PUBLISHED_PROJECT_BEGIN
});

export const fetchAllPublishedProjectSuccess = projects => ({
  type: FETCH_ALL_PUBLISHED_PROJECT_SUCCESS,
  payload: projects
});

export const fetchAllPublishedProjectError = error => ({
  type: FETCH_ALL_PUBLISHED_PROJECT_FAILURE,
  payload: error
});


export function fetchAllPublishedProject(id) {
	var clientAuthService = new ClientAuthService();

	return dispatch => {
		dispatch(fetchAllPublishedProjectBegin());
		return clientAuthService.fetch('/api_get_all_proj_published_by_user?id=' + id, {method: "GET"})
			.then(data => {
		        dispatch(fetchAllPublishedProjectSuccess(data));
		        return true;
      		})
      		.catch(error => {
      			dispatch(fetchAllPublishedProjectError(error));
      			throw error;	
      		});
	}
}