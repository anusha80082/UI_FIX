import React from 'react';
import Header from './HeaderComponent';
import Main from './Main';
import Footer from './Footer';
import LeftMenu from './LeftMenu';
import Settings from './Settings';
import { Link } from 'react-router-dom';
require('../css/style.css');
require('../css/libs.css');

class DashboardComponent extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div id="all-branchs">
          <Link to="#" className="view-branchs">DBS Singapore</Link>
          <div className="all-branch-modals">
            <ul>
              <li>
                <Link to="#" className="active"> DBS Singapore</Link>
              </li>
              <li>
                <Link to="#">DBS India</Link>
              </li>
              <li>
                <Link to="#">DBS HongKong</Link>
              </li>
              <li>
                <Link to="#">DBS Taiwan</Link>
              </li>
            </ul>
          </div>
        </div>
        <LeftMenu />
        <Main />
        <Settings />
        <Footer />
      </div>
    );
  }
}

export default DashboardComponent;
