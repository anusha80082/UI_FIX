import React from 'react';
import { Link } from 'react-router-dom';


// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <div>
    <div id="notification-tooltip"><Link to="javascript:;" title="Close" className="icons-close"></Link>
      <p>You have<strong> 7 notifications</strong>&nbsp; pending for your action.</p>
    </div>
    <header id="header">
      <Link to="" title="DBS" className="logo" style={{ 'color': 'white' }}>
        <img src={require('../images/logo-white.png')} alt="DBS" />
        Fixed Income Execution Platform
     </Link>
      <div className="right-header">
        <ul>
          <li><Link to="search.html" title="Search" className="icon-search">Search</Link>
          </li>
          <li><Link to="javascript:;" title="Notification" className="icon-notification" data-overlay><span>7</span></Link>
          </li>
          <li><Link to="javascript:;" title="Information" className="icon-info" data-overlay>Information</Link>
          </li>
          <li><Link to="javascript:;" title="Logout" className="icon-logout">Logout</Link>
          </li>
        </ul>
      </div>
      <div id="all-branchs" data-overlay><Link to="#" className="view-branchs">ALLGREEN PROPERTIES LTD | DBS Singapore</Link>
        <div className="all-branch-modals">
          <ul>
            <li><Link to="#" className="active">ALLGREEN PROPERTIES LTD | DBS Singapore</Link>
            </li>
            <li><Link to="#">DC-MART CORPORATION | DBS India</Link>
            </li>
            <li><Link to="#">GONGXI FORTUNE ENTERPRISE | DBS Hong Kong</Link>
            </li>
            <li><Link to="#">JIAJIA DEYI PTE LTD | DBS Hong Kong</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  </div>
)

export default Header;
