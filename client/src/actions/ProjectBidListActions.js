import ClientAuthService from '../utils/ClientAuthService';

export const FETCH_PROJCET_BID_LIST_BEGIN   = 'FETCH_PROJCET_BID_LIST_BEGIN';
export const FETCH_PROJCET_BID_LIST_SUCCESS = 'FETCH_PROJCET_BID_LIST_SUCCESS';
export const FETCH_PROJCET_BID_LIST_FAILURE = 'FETCH_PROJCET_BID_LIST_FAILURE';

export const fetchProjBidListBegin = () => ({
  type: FETCH_PROJCET_BID_LIST_BEGIN
});

export const fetchProjBidListSuccess = projectDetails => ({
  type: FETCH_PROJCET_BID_LIST_SUCCESS,
  payload: projectDetails
});

export const fetchProjBidListError = error => ({
  type: FETCH_PROJCET_BID_LIST_FAILURE,
  payload: error
});


export function fetchProjBidList(id) {
	
	var clientAuthService = new ClientAuthService();

	return dispatch => {
		dispatch(fetchProjBidListBegin());
		return clientAuthService.fetch('/projects/' + id + '/bids', {method: "GET"})
			.then(data => {
		        dispatch(fetchProjBidListSuccess(data));
		        return true;
      		})
      		.catch(error => {
      			dispatch(fetchProjBidListError(error));
      			throw error;
      		});
	}
}