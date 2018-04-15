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