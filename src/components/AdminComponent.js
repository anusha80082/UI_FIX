import React from 'react';
import Header from './HeaderComponent';
import { Link } from 'react-router-dom';

const jsonData = {
  "adminReports": [
    {
      "report_name": "Audit 1",
      "generated_date": "16 Apr 2015 17:46"
    },
    {
      "report_name": "TEST_SGGCIN02",
      "generated_date": "16 Apr 2015 17:46"
    },
    {
      "report_name": "Audit Test",
      "generated_date": "16 Apr 2015 17:46"
    },
    {
      "report_name": "",
      "generated_date": ""
    }
  ]
};

class AdminComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: jsonData,
    }
  }
  render() {
    return (
      <div id="container">
        <main id="main">
          <section data-tab className="tab statements">
            <ul data-tab-header className="tab-header">
              <li><Link to="#tab-1" className="active">User</Link>
              </li>
              <li><Link to="#tab-2">Client</Link>
              </li>
              <li><Link to="#tab-3">Workflow Template</Link>
              </li>
            </ul>
            <section data-tab-content className="main-content">
              <div id="tab-1" className="tab-item active">
                <header>
                  <time className="last-update">Last Generated 17 Apr 2015 17:46</time>
                  <h2 className="title-primary">User</h2>
                </header>
                <div className="fitler-group">
                  <span className="item-selected">
                    <span className="item-number">0</span>item(s) selected</span></div>
                <table data-table="table-1" className="table">
                  <tr>
                    <th width="30">
                      <label className="checkbox">
                        <input type="checkbox" name="check-all" className="checkbox" /><span></span>
                      </label>
                    </th>
                    <th width="220">Report Name<Link to="javascript:;" className="icon-sort">Sort</Link>
                    </th>
                    <th>Generated Date/Time<Link to="javascript:;" className="icon-sort">Sort</Link>
                    </th>
                  </tr>
                  {this.state.data.adminReports.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <label className="checkbox">
                          <input type="checkbox" className="checkbox" /><span></span>
                        </label>
                      </td>
                      <td><Link to="#" className="link-default">{row.report_name}</Link>
                      </td>
                      <td>{row.generated_date}}</td>
                    </tr>
                  ))
                  }
                </table>
                <p className="amount-of-items">1-3 of 5 items</p>
              </div>
            </section>
          </section></main>
      </div>
    );
  }
}

export default AdminComponent;
