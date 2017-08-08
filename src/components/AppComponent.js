import React from 'react';
import Header from './HeaderComponent';
import BodyContent from './ContainerComponent';
import Footer from './FooterComponent';
import LeftMenu from './LeftMenuComponent';
import Settings from './SettingsComponent';
require('../css/style.css');
require('../css/libs.css');

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <LeftMenu />
        <BodyContent />
        <Settings />
        <Footer />
      </div>
    );
  }
}

export default AppComponent;
