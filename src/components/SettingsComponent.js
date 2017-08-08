import React from 'react';
import { Link } from 'react-router-dom';

// The Header creates links that can be used to navigate
const Settings = () => (

  <div id="settings">
    <div className="collapse-group">
      <div className="collapse-item">
        <div className="collapse-header"><Link to="#" className="icon-language">Language</Link>
        </div>
        <div className="collapse-content">
          <ul className="language">
            <li><a href="#" className="active">English</a>
            </li>
            <li><a href="#">简体中文</a>
            </li>
            <li><a href="#">繁體中文 （台灣）</a>
            </li>
            <li><a href="#">繁體中文 （香港）</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="collapse-item">
        <div className="collapse-header"><Link to="#" className="icon-phone">DBS BusinessCare</Link>
        </div>
        <div className="collapse-content">
          <ul className="call-center">
            <li><img src={require('../images/icons/singapore@2x.png')} alt="" />
              <div className="call-info">
                <p className="country">SINGAPORE</p>
                <p>1800 222 2200</p>
              </div>
            </li>
            <li><img src={require('../images/icons/hong-kong@2x.png')} alt="" />
              <div className="call-info">
                <p className="country">HongKong</p>
                <p>2290 8068</p>
              </div>
            </li>
            <li><img src={require('../images/icons/taiwan@2x.png')} alt="" />
              <div className="call-info">
                <p className="country">Taiwan</p>
                <p>0800 808 889</p>
              </div>
            </li>
            <li><img src={require('../images/icons/china@2x.png')} alt="" />
              <div className="call-info">
                <p className="country">China</p>
                <p>400 821 8881</p>
              </div>
            </li>
            <li><img src={require('../images/icons/india@2x.png')} alt="" />
              <div className="call-info">
                <p className="country">INDIA</p>
                <p>1800 209 4555</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="collapse-item">
        <div className="collapse-header no-content"><a href="user-profile.html" className="icon-user" target="_blank">User Profile</a>
        </div>
      </div>
    </div>
  </div>
)

export default Settings
