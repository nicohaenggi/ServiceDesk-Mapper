var React = require('react');
var Navigation = require('Navigation');
var CodeTextBox = require('CodeTextBox');
var CodeOutput = require('CodeOutput');
var Options = require('Options');
var Papa  = require('papaparse');

var Main = React.createClass({

  /** ## inital react state
  *
  * returns the initial state
  */
  getInitialState: function() {
    return {
      originEnvironment: localStorage.getItem('originEnvironment') || "",
      destinationEnvironment: localStorage.getItem('destinationEnvironment') || "",
      code: "",
      customFields: []
    }
  },
  /** ## component mounted
  *
  * called when the react component got mounted
  */
  componentDidMount: function() {
    // ### .csv parsing
    // parses the customfields.csv file in the directory
    // in order to help map the different environment fields
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
        this.setState( { customFields: array } );
    	}
    });
  },
  /** ## settings changed
  * called when a settings change occurs (e.g. when Origin or Destination is changed)
  *
  * @param {String} type the type of the change (e.g. origin or destination)
  * @param {String} newStatus the new status of the changed field (e.g. intg, devl, prod, name)
  */
  handleStatusChange: function(type, newStatus) {
    if(type === "origin") {
      // ## sets state and localStorage in order to retrieve settings later
      this.setState({ originEnvironment: newStatus });
      localStorage.setItem('originEnvironment', newStatus);
    } else if(type === "destination") {
      // ## sets state and localStorage in order to retrieve settings later
      this.setState({ destinationEnvironment: newStatus });
      localStorage.setItem('destinationEnvironment', newStatus);
    }
  },
  /** ## code input changed
  * called when the code input was updated, deleted or removed
  *
  * @param {String} newStatus the new (updated) code input
  */
  handleCodeChange: function(newStatus) {
    this.setState({ code: newStatus });
  },
  /** ## render function
  *
  * called whenever react renders the component; e.g. when state is updated
  */
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

// # export for use elsewhere
module.exports = Main;
