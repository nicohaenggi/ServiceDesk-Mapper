var React = require('react');
var Navigation = require('Navigation');
var CodeTextBox = require('CodeTextBox');
var CodeOutput = require('CodeOutput');
var Options = require('Options');
var Papa  = require('papaparse');

var Main = React.createClass({
  getInitialState: function() {
    return {
      originEnvironment: localStorage.getItem('originEnvironment') || "",
      destinationEnvironment: localStorage.getItem('destinationEnvironment') || "",
      code: "",
      customFields: []
    }
  },
  componentDidMount: function() {
    Papa.parse("customfields.csv", {
    	download: true,
      header: true,
    	complete: (results) => {
        var array = results.data.map((obj) => {
          return {
            "name": obj["Field Name"],
            "devl": obj.DEV,
            "intg": obj.INTG,
            "prod": obj.PROD
          }
        });
        this.setState({ customFields: array });
    	}
    });
  },
  handleStatusChange: function(type, newStatus) {
    if(type === "origin") {
      this.setState({ originEnvironment: newStatus });
      localStorage.setItem('originEnvironment', newStatus);
    } else if(type === "destination") {
      this.setState({ destinationEnvironment: newStatus });
      localStorage.setItem('destinationEnvironment', newStatus);
    }
  },
  handleCodeChange: function(newStatus) {
    // ## Set Code
    this.setState({ code: newStatus });
  },
  render: function() {
    var {originEnvironment, destinationEnvironment, code, customFields} = this.state;

    return (
      <div>
        <Navigation/>
        <div className="row">
          <div className="medium-6 columns">
              <CodeTextBox code={code} onCodeChange={this.handleCodeChange}/>
              <Options destinationEnvironment={destinationEnvironment} originEnvironment={originEnvironment} onStatusChange={this.handleStatusChange}/>
          </div>
          <div className="medium-6 columns">
              <CodeOutput code={code} customFields={customFields} destinationEnvironment={destinationEnvironment} originEnvironment={originEnvironment} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Main;
