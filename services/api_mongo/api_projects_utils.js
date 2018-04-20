// bind employer data to projects data
module.exports.bindEmployerData = function(projects, users)
{
	if(!projects || !users) return;
	
	projects = Array.isArray(projects) ? projects : [projects];

	for (let i = 0; i < projects.length; i++)
	{
		var project = projects[i];
		for (let j = 0; j < users.length; j++)
		{
			var user = users[j];
			if(project.employer_id === user._id.toString())
			{
				project.employer = user;
				break;
			}
		}
	}
}

// bind bidder data to bids data
module.exports.bindBidderData = function(bids, users)
{
	if(!bids || !users) return;

	bids = Array.isArray(bids) ? bids : [bids];
	
	for (let i = 0; i < bids.length; i++)
	{
		var bid = bids[i];
		for (let j = 0; j < users.length; j++)
		{
			var user = users[j];
			if(bid.bidder_id === user._id.toString())
			{
				bid.bidder = user;
				break;
			}
		}
	}
}

// calc ave bid price
module.exports.bindAveBidPrice = function(projects)
{
	if(!projects) return;
	
	projects = Array.isArray(projects) ? projects : [projects];

	for (let i = 0; i < projects.length; i++)
	{
		var project = projects[i];
		var bidPriceSum = 0;
		var validBidsCount = 0;
		project.bids.forEach(function(bid){
			if(bid.bid_price && bid.bid_price.length > 0)
			{
				bidPriceSum += parseFloat(bid.bid_price);
				validBidsCount++; 
			}
		});
		project.ave_bid_price = validBidsCount > 0 ? (bidPriceSum / validBidsCount) : 0;
	}
}

// find "your" bid index
module.exports.bindYourBidIndex = function(projects, userID)
{
	if(!projects) return;
	
	projects = Array.isArray(projects) ? projects : [projects];

	for (let i = 0; i < projects.length; i++)
	{
		var project = projects[i];
		for(let i = 0; i < project.bids.length; i++)
		{
			let currBid = project.bids[i];
			if(currBid.bidder_id === userID)
			{
				project.your_bid_index = i;
				break;
			}
		}
	}
}


// build mongodb query object from request query string
// currently assume no array in query 
module.exports.buildQueryObject = function(reqQuery)
{
	var dbQuery = {};
 
 	if(reqQuery.generalQueryStr)  dbQuery["$or"] = [ { project_skills: {'$regex': reqQuery.generalQueryStr, '$options': 'i'} }, { project_name: {'$regex': reqQuery.generalQueryStr, '$options': 'i'} } ];
	if(reqQuery.projectStatus) dbQuery["project_status"] = reqQuery.projectStatus;
	if(reqQuery.projectName) dbQuery["project_name"] = reqQuery.projectName;
	
	return dbQuery;
}