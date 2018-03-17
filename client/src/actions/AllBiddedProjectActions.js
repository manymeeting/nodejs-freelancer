import ClientAuthService from '../utils/ClientAuthService';

export const FETCH_ALL_BIDDED_PROJECT_BEGIN   = 'FETCH_ALL_BIDDED_PROJECT_BEGIN';
export const FETCH_ALL_BIDDED_PROJECT_SUCCESS = 'FETCH_ALL_BIDDED_PROJECT_SUCCESS';
export const FETCH_ALL_BIDDED_PROJECT_FAILURE = 'FETCH_ALL_BIDDED_PROJECT_FAILURE';

export const fetchAllBiddedProjectBegin = () => ({
  type: FETCH_ALL_BIDDED_PROJECT_BEGIN
});

export const fetchAllBiddedProjectSuccess = projects => ({
  type: FETCH_ALL_BIDDED_PROJECT_SUCCESS,
  payload: projects
});

export const fetchAllBiddedProjectError = error => ({
  type: FETCH_ALL_BIDDED_PROJECT_FAILURE,
  payload: error
});


export function fetchAllBiddedProject(id) {
	var clientAuthService = new ClientAuthService();

	return dispatch => {
		dispatch(fetchAllBiddedProjectBegin());
		return clientAuthService.fetch('/api_get_all_proj_bidded_by_user?id=' + id, {method: "GET"})
			.then(data => {
		        dispatch(fetchAllBiddedProjectSuccess(data));
		        return true;
      		})
      		.catch(error => {
      			dispatch(fetchAllBiddedProjectError(error));
      			throw error;	
      		});
	}
}