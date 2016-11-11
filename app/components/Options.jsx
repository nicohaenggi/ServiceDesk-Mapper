var React = require('react');

var Options = React.createClass({
  onStatusChange(type, e) {
    this.props.onStatusChange(type, e.target.value);
  },
  render() {
    return (
      <div className="small-12 options">
        <div>
          <select value={this.props.originEnvironment} onChange={ this.onStatusChange.bind(this, 'origin') } className="dropdown">
            <option value="" className="label">Origin Environment</option>
            <option value="devl">DEVL</option>
            <option value="intg">INTG</option>
            <option value="prod">PROD</option>
          </select>
        </div>
        <div>
          <select value={this.props.destinationEnvironment} onChange={ this.onStatusChange.bind(this, 'destination') } className="dropdown">
            <option value="" className="label">Destination Environment</option>
            <option value="devl">DEVL</option>
            <option value="intg">INTG</option>
            <option value="prod">PROD</option>
          </select>
        </div>
      </div>
    );
  }
});

module.exports = Options;
