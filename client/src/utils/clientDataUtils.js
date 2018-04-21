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
	}
}
