var fetch = require('node-fetch');
var chai = require('chai');
var dbUtil = require('../utils/dbutil');
var project_codes = require('../codes/project_codes');
var api_projects = require('../api/api_projects');

const TABLE_PROJCETS = ' ' + dbUtil.getDBName() + ".projects" + ' ';
const TABLE_USERS = ' ' + dbUtil.getDBName() + ".users" + ' ';
const TABLE_BIDS = ' ' + dbUtil.getDBName() + ".bids" + ' ';

describe('Test Get All Projects', function () {
  it('should return all OPEN projects', function () {
  	fetch('http://localhost:3001/api_get_all_open_proj')
  	.then(res => res.text())
    .then(body => {
    	var projects = JSON.parse(body);
    	for(let i = 0; i < projects.length; i++)
    	{
    		chai.expect(projects[i].status).to.equal(project_codes.PROJECT_STATUS.OPEN);
    	}
    })
    .catch(err => {
    	console.log(err);
    });
    
  });
  
});
