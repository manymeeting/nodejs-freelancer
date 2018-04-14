// bind employer data to projects data
module.exports.bindEmployerData = function(projects, users)
{
	for (let i = 0; i < projects.length; i++)
	{
		var project = projects[i];
		for (let j = 0; j < users.length; j++)
		{
			var user = users[i];
			if(project.employer_id === user._id.toString())
			{
				project.employer = user;
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