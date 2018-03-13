import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import withAuth from '../utils/withAuth';

// views
import AllOpenProjListContainer from "../components/AllOpenProjListContainer";

const Home = () => (
  <div>
    <h1>Home</h1>
    <AllOpenProjListContainer />
  </div>
)

// home page is open to registered users only
export default withAuth(Home);