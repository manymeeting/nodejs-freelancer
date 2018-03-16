import ClientAuthService from '../utils/ClientAuthService';

export const FETCH_ALL_OPEN_PROJECTS_BEGIN   = 'FETCH_ALL_OPEN_PROJECTS_BEGIN';
export const FETCH_ALL_OPEN_PROJECTS_SUCCESS = 'FETCH_ALL_OPEN_PROJECTS_SUCCESS';
export const FETCH_ALL_OPEN_PROJECTS_FAILURE = 'FETCH_ALL_OPEN_PROJECTS_FAILURE';

export const fetchAllOpenProjBegin = () => ({
  type: FETCH_ALL_OPEN_PROJECTS_BEGIN
});

export const fetchAllOpenProjSuccess = projects => ({
  type: FETCH_ALL_OPEN_PROJECTS_SUCCESS,
  payload: projects
});

export const fetchAllOpenProjError = error => ({
  type: FETCH_ALL_OPEN_PROJECTS_FAILURE,
  payload: error
});


export function fetchAllOpenProjects() {
	
	var clientAuthService = new ClientAuthService();

	return dispatch => {
		dispatch(fetchAllOpenProjBegin());
		return clientAuthService.fetch('/api_get_all_open_proj')
			.then(data => {
		        dispatch(fetchAllOpenProjSuccess(data));
		        return true;
      		})
      		.catch(error => {
      			dispatch(fetchAllOpenProjError(error));
      			throw error;
      		});
	}
}