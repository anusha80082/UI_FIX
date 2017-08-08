import React from 'react';
import Header from './HeaderComponent';
const jsonData = {
  "valuationReports": [
    {
      "valuation_date": "15 Apr 2015",
      "upload_date": "16 Apr 2015 17:46"
    },
    {
      "valuation_date": "15 Apr 2015",
      "upload_date": "16 Apr 2015 17:46"
    },
    {
      "valuation_date": "15 Apr 2015",
      "upload_date": "16 Apr 2015 17:46"
    },
    {
      "valuation_date": "15 Apr 2015",
      "upload_date": "16 Apr 2015 17:46"
    }
  ]
};

class ProjectComponent extends React.Component {
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
          <section className="main-content">
            <header>
              <time className="last-update">Last upload 17 Apr 2015 17:46</time>
              <h2 className="title-primary">Valuation Reports<span className="text-blue">(2)</span></h2>
            </header>
            <div className="fitler-group"><span className="item-selected"><span className="item-number">0</span>item(s) selected</span></div>
            <table data-table="table-valuation" className="table">
              <tr>
                <th width="30">
                  <label className="checkbox">
                    <input type="checkbox" name="check-all" className="checkbox" /><span></span>
                  </label>
                </th>
                <th width="220">Valuation Date<a href="javascript:;" className="icon-sort">Sort</a>
                </th>
                <th>Upload Date/Time<a href="javascript:;" className="icon-sort">Sort</a>
                </th>
              </tr>
              {this.state.data.valuationReports.map((row, index) => (
                <tr key={index}>
                  <td>
                    <label className="checkbox">
                      <input type="checkbox" name="" className="checkbox" /><span></span>
                    </label>
                  </td>
                  <td><a href="#" className="link-default">{row.valuation_date}</a><span className="new-item">New</span>
                  </td>
                  <td>{row.upload_date}</td>
                </tr>
              ))
              }
            </table>
            <p className="amount-of-items">1-5 of 5 items</p>
          </section>
        </main>
        <div data-download="table-valuation" className="download-row"><a href="#" title="Download" className="btn-download"><span>Download</span></a>
        </div>
      </div>
    );
  }
}

export default ProjectComponent;
