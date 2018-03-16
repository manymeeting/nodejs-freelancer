import ClientAuthService from '../utils/ClientAuthService';

export const FETCH_PROJCET_BASIC_INFO_BEGIN   = 'FETCH_PROJCET_BASIC_INFO_BEGIN';
export const FETCH_PROJCET_BASIC_INFO_SUCCESS = 'FETCH_PROJCET_BASIC_INFO_SUCCESS';
export const FETCH_PROJCET_BASIC_INFO_FAILURE = 'FETCH_PROJCET_BASIC_INFO_FAILURE';

export const fetchProjBasicInfoBegin = () => ({
  type: FETCH_PROJCET_BASIC_INFO_BEGIN
});

export const fetchProjBasicInfoSuccess = projectDetails => ({
  type: FETCH_PROJCET_BASIC_INFO_SUCCESS,
  payload: projectDetails
});

export const fetchProjBasicInfoError = error => ({
  type: FETCH_PROJCET_BASIC_INFO_FAILURE,
  payload: error
});


export function fetchProjBasicInfo(id) {
	
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