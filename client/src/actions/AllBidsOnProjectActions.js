import ClientAuthService from '../utils/ClientAuthService';

export const FETCH_ALL_BIDS_ON_PROJECT_BEGIN   = 'FETCH_ALL_BIDS_ON_PROJECT_BEGIN';
export const FETCH_ALL_BIDS_ON_PROJECT_SUCCESS = 'FETCH_ALL_BIDS_ON_PROJECT_SUCCESS';
export const FETCH_ALL_BIDS_ON_PROJECT_FAILURE = 'FETCH_ALL_BIDS_ON_PROJECT_FAILURE';

export const fetchProjBasicInfoBegin = () => ({
  type: FETCH_ALL_BIDS_ON_PROJECT_BEGIN
});

export const fetchProjBasicInfoSuccess = projects => ({
  type: FETCH_ALL_BIDS_ON_PROJECT_SUCCESS,
  payload: projects
});

export const fetchProjBasicInfoError = error => ({
  type: FETCH_ALL_BIDS_ON_PROJECT_FAILURE,
  payload: error
});


export function fetchAllBidsOnProject(id) {
	
	var clientAuthService = new ClientAuthService();

	return dispatch => {
		dispatch(fetchProjBasicInfoBegin());
		return clientAuthService.fetch('/api_get_project_details?id=' + id, {method: "GET"})
			.then(data => {
		        dispatch(fetchProjBasicInfoSuccess(data));
		        return true;
      		})
      		.catch(error => {
      			dispatch(fetchProjBasicInfoError(error));
      			throw error;
      		});
	}
}