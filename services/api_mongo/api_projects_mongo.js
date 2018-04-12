var mongoUtil = require("../utils/mongoDBUtil");
var ObjectId = require('mongodb').ObjectId; 
var project_codes = require('../codes/project_codes');

module.exports.getAllOpenProjects = function (req, res, next) {
	var projectsQuery = {
		"project_status": project_codes.PROJECT_STATUS.OPEN
	}

	mongoUtil.getMongoConn(function(db) {
		db.collection('projects').find(projectsQuery).toArray(function(errProj, projects) {
			if(errProj)
			{
				throw errProj;
			}
			// query for employer information
			db.collection('users').find({}, {fields: {user_password: 0}}).toArray(function(errUsers, users) {
				if(errUsers)
				{
					throw errUsers;
				}
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
				console.log(projects);
				res.type('json');
				res.send(JSON.stringify(projects));

			});
			
		});
	});
}

module.exports.getProjectDetails = function(req, res, next) {
	var projectsQuery = {
		"_id": ObjectId(req.query.id)
	}

	mongoUtil.getMongoConn(function(db) {
		db.collection('projects').find(projectsQuery).toArray(function(errProj, projects) {
			if(errProj)
			{
				throw errProj;
			}
			// query for employer information
			db.collection('users').find({}, {fields: {user_password: 0}}).toArray(function(errUsers, users) {
				if(errUsers)
				{
					throw errUsers;
				}
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
				console.log(projects);
				res.type('json');
				res.send(JSON.stringify(projects));

			});
			
		});
	});
}