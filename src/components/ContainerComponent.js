import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import project from './ProjectComponent';
import client from './ClientComponent';
import admin from './AdminComponent';

const BodyContent = () => (
  <Router history={browserHistory}>
    <Route path="/" component={project} />
    <Route path="/dashboard" component={project} />
    <Route path="project" component={project} />
    <Route path="/client" component={client} />
    <Route path="/admin" component={client} />
  </Router>
)
export default BodyContent
