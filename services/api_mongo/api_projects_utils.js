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