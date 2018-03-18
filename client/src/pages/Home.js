import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import withAuth from '../utils/withAuth';
// resources
import '../css/home.css';
// views
import AllOpenProjListContainer from "../components/AllOpenProjListContainer";

const Home = () => (
  <div className="fl-main-container">
    <h1 className="fl-main-header">All Open Projects</h1>
    <AllOpenProjListContainer />
  </div>
)

// home page is open to registered users only
export default withAuth(Home);