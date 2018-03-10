import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import {withRouter} from 'react-router';
import withAuth from './utils/withAuth';
import ClientAuthService from './utils/authclient';

import update from 'react-addons-update';
const Auth = new AuthService();

class ProjectListContainer extends React.Component {

}


class ProjectList extends React.Component {

}

const Home = () => (
  <div>
    <h1>Home</h1>
    <ProjectListContainer />
  </div>
)


export default withAuth(Home); // home page is open to registered users only