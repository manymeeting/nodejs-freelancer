import ClientAuthService from '../utils/ClientAuthService';

export const ADD_BID_ON_PROJECT_BEGIN   = 'ADD_BID_ON_PROJECT_BEGIN';
export const ADD_BID_ON_PROJECT_SUCCESS = 'ADD_BID_ON_PROJECT_SUCCESS';
export const ADD_BID_ON_PROJECT_FAILURE = 'ADD_BID_ON_PROJECT_FAILURE';

export const addBidOnProjectBegin = () => ({
  type: ADD_BID_ON_PROJECT_BEGIN
});

export const addBidOnProjectSuccess = data => ({
  type: ADD_BID_ON_PROJECT_SUCCESS,
  payload: data
});

export const addBidOnProjectError = error => ({
  type: ADD_BID_ON_PROJECT_FAILURE,
  payload: error
});


export function addBidOnProject(params) {
	
	var clientAuthService = new ClientAuthService();
	var newBid = {
		projectID: params.projectID,
		bidderID: params.bidderID,
		employerID: params.employerID,
		bidPeriod: params.bidPeriod,
		bidDate: params.bidDate,
		bidPrice: params.bidPrice
	};
	return dispatch => {
		dispatch(addBidOnProjectBegin());
		return clientAuthService.fetch('/api_add_bid_on_proj', {
		        method: 'PUT',
		        body: JSON.stringify(newBid)
	    	})
			.then(data => {
		        dispatch(addBidOnProjectSuccess({
		        	project_id: params.projectID,
		        	bid_id: data.insertID
		        }));
		        return true;
      		})
      		.catch(error => {
      			dispatch(addBidOnProjectError(error));
      			throw error;
      		});
	}
}