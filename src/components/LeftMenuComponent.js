import React from 'react';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router';

const LeftMenuComponent = () => (
  <nav id="left-nav">
    <ul>
      <Link to="/dashboard" onClick={(e) => { e.preventDefault(); browserHistory.push('/dashboard'); }} >&nbsp;
        <span className='icon-dashboard'></span><span>Dashboard</span>
      </Link>
      <li><Link to='/project' onClick={(e) => { e.preventDefault(); browserHistory.push('/project'); }} >&nbsp;
        <span className="icon-valuations"></span><span>Projects</span></Link>
      </li>
      <li><Link to='/client' onClick={(e) => { e.preventDefault(); browserHistory.push('/client'); }} >&nbsp;
        <span className="icon-transactions"></span><span>Clients</span></Link>
      </li>
      <li><Link to='/admin' onClick={(e) => { e.preventDefault(); browserHistory.push('/admin'); }} >&nbsp;
        <span className="icon-statements"></span><span>Admin</span></Link>
      </li>
    </ul>

    <a href="#" id="settings-link" data-overlay><span className="icon-settings"></span><span>Settings</span></a>
  </nav>
)

export default LeftMenuComponent