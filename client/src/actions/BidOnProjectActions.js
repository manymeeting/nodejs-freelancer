import ClientAuthService from '../utils/ClientAuthService';
import crypto from 'crypto';

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
	var bidID = crypto.randomBytes(16).toString('hex');
	var newBid = {
		bidID: bidID,
		projectID: params.projectID,
		bidderID: params.bidderID,
		employerID: params.employerID,
		bidPeriod: params.bidPeriod,
		bidDate: params.bidDate,
		bidPrice: params.bidPrice
	};
	return dispatch => {
		dispatch(addBidOnProjectBegin());
		return clientAuthService.fetch('/projects/' + params.projectID + '/bids', {
		        method: 'PUT',
		        body: JSON.stringify(newBid)
	    	})
			.then(data => {
		        dispatch(addBidOnProjectSuccess({
		        	bid_id: bidID
		        }));
		        return true;
      		})
      		.catch(error => {
      			dispatch(addBidOnProjectError(error));
      			throw error;
      		});
	}
}