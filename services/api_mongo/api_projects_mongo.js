var mongoUtil = require("../utils/mongoDBUtil");
var ObjectId = require('mongodb').ObjectId; 
var project_codes = require('../codes/project_codes');
var projects_utils = require('./api_projects_utils');

module.exports.searchProjects = function (req, res, next) {
	var projectsQuery = projects_utils.buildQueryObject(req.query);
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
				projects_utils.bindEmployerData(projects, users);
				projects.forEach(function(project){
					projects_utils.bindBidderData(project.bids, users);
				});
				console.log(projects);
				res.type('json');
				res.send(JSON.stringify(projects));

			});
			
		});
	});
}


module.exports.getAllProjectsOnStatus = function (req, res, next) {
	var projectsQuery = {
		"project_status": req.params.status.toUpperCase()
	};

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
				projects_utils.bindEmployerData(projects, users);
				projects.forEach(function(project){
					projects_utils.bindBidderData(project.bids, users);
				});
				console.log(projects);
				res.type('json');
				res.send(JSON.stringify(projects));

			});
			
		});
	});
}

module.exports.getProjectDetails = function(req, res, next) {
	var projectsQuery = {
		"_id": ObjectId(req.params.id)
	};

	mongoUtil.getMongoConn(function(db) {
		db.collection('projects').findOne(projectsQuery, function(errProj, projects) {
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
				projects_utils.bindEmployerData(projects, users);
				projects_utils.bindBidderData(projects.bids, users);
				console.log(projects);
				res.type('json');
				res.send(JSON.stringify(projects));

			});
			
		});
	});
}

module.exports.getAllBidsOnProject = function(req, res, next) {
	var projectsQuery = {
		"_id": ObjectId(req.params.id)
	};

	mongoUtil.getMongoConn(function(db) {
		db.collection('projects').findOne(projectsQuery, function(errProj, projects) {
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
				projects_utils.bindBidderData(projects.bids, users);
				console.log(projects.bids);
				
				var result = projects.bids ? projects.bids : [];
				res.type('json');
				res.send(JSON.stringify(result));

			});
			
		});
	});
}

module.exports.getAllProjBiddedByUser = function(req, res, next) {
	var projectsQuery = {
		"bids": {$elemMatch: {"bidder_id": req.params.id}}
	};
	mongoUtil.getMongoConn(function(db) {
		db.collection('projects').find(projectsQuery).toArray(function(err, result) {
			if(err)
			{
				throw err;
			}
			console.log(result);
			res.type('json');
			res.send(JSON.stringify(result));
			
		});
	});
}

module.exports.getAllProjPublishedByUser = function (req, res, next) {
	var projectsQuery = {
		"employer_id": req.params.id
	};
	mongoUtil.getMongoConn(function(db) {
		db.collection('projects').find(projectsQuery).toArray(function(err, result) {
			if(err)
			{
				throw err;
			}
			console.log(result);
			res.type('json');
			res.send(JSON.stringify(result));
			
		});
	});
}

module.exports.postProject = function(req, res, next) {

	var newProj = {
		project_name: req.body.projectName,
		employer_id: req.body.employerID,
		project_description: req.body.projectDescription,
		project_files: req.body.projectFiles,
		project_skills: req.body.projectSkills ? req.body.projectSkills : [],
		project_budget_range: req.body.budgetRange,
		project_published_date: req.body.publishedDate,
		project_status: project_codes.PROJECT_STATUS.OPEN
	};

	mongoUtil.getMongoConn(function(db) {
		db.collection('projects').insertOne(newProj, function(err, result) {
			if(err)
			{
				throw err;
			}
			console.log(result.ops);
			res.type('json');
			res.status(201).send(JSON.stringify(result.ops[0]));
			
		});
	});
}

 module.exports.addBidOnProject = function(req, res, next) {
 	var projectsQuery = {
		"_id": ObjectId(req.params.id),
	};

	var newBid = {
		$push: {
			"bids": {
				bid_id: req.body.bidID,
				bidder_id: req.body.bidderID,
		 		bid_period: req.body.bidPeriod,
		 		bid_date: req.body.bidDate,
		 		bid_price: req.body.bidPrice
			} 
		}
	}
 	mongoUtil.getMongoConn(function(db) {
		db.collection('projects').updateOne(projectsQuery, newBid, function(err, result) {
			if(err)
			{
				throw err;
			}
			res.type('json');
			res.send(JSON.stringify(result));
		});
	});
}

module.exports.hireBid = function(req, res, next) {
	var projectsQuery = {
		"_id": ObjectId(req.params.projectID),
	};
	var newBid = {
		$set: { "hired_bid_id" : req.params.bidID }
	}
	mongoUtil.getMongoConn(function(db) {
		db.collection('projects').updateOne(projectsQuery, newBid, function(err, result) {
			if(err)
			{
				throw err;
			}
			res.type('json');
			res.send(JSON.stringify(result));
		});
	});
}

module.exports.updateStatus = function(req, res, next) {
	var projectsQuery = {
		"_id": ObjectId(req.params.id),
	};
	var newStatus = {
		$set: { "project_status" : req.params.status.toUpperCase() }
	}
	mongoUtil.getMongoConn(function(db) {
		db.collection('projects').updateOne(projectsQuery, newStatus, function(err, result) {
			if(err)
			{
				throw err;
			}
			res.type('json');
			res.send(JSON.stringify(result));
		});
	});
}
