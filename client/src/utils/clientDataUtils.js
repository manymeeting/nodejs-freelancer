export var projectDataUtils = {
	getHiredBid: function(project) {
		var bids = project.bids;
		if(!bids) return null;

		for(var i = 0; i < bids.length; i++)
		{
			var bid = bids[i];
			if(bid.bid_id === project.hired_bid_id)
			{
				return bid;
			}
		}
		return null;
	},

	findBidOnUser: function(project, userID) {
		if(!project || !userID || !project.bids) return null;
		var bids = project.bids;
		for(var i = 0; i < bids.length; i++)
		{
			var bid = bids[i];
			if(bid.bidder_id === userID)
			{
				return bid;
			}
		}
		return null;
	},

	findBidByID: function(project, bidID) {
		if(!project || !bidID || !project.bids) return null;
		var bids = project.bids;
		for(var i = 0; i < bids.length; i++)
		{
			var bid = bids[i];
			if(bid.bid_id === bidID)
			{
				return bid;
			}
		}
		return null;
	}
}
