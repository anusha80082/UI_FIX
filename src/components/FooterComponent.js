import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (

  <div>
    <footer id="footer">
      <ul>
        <li><Link to="#">DBS.com</Link>
        </li>
        <li><Link to="#">Privacy Policy</Link>
        </li>
        <li>&copy; 2015 DBS Bank Ltd</li>
        <li>Co. Reg. No. 196800306E</li>
      </ul><Link to="#" id="back-to-top">Back to top</Link>
    </footer>
  </div>
)

export default Footer
