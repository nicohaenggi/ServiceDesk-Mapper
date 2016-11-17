var React = require('react');

var Options = React.createClass({
  /** ## settings changed
  * called when a settings change occurs (e.g. when Origin or Destination is changed)
  *
  * @param {String} type the type of the change (e.g. origin or destination)
  * @param {event} e the event of the changed field
  */
  onStatusChange(type, e) {
    this.props.onStatusChange(type, e.target.value);
  },
  /** ## render function
  *
  * called whenever react renders the component; e.g. when state is updated
  */
  render() {
    return (
      <div className="small-12 options">
        <div>
          <select value={this.props.originEnvironment} onChange={ this.onStatusChange.bind(this, 'origin') } className="dropdown">
            <option value="" className="label">Origin Environment</option>
            <option value="devl">DEVL</option>
            <option value="intg">INTG</option>
            <option value="prod">PROD</option>
            <option value="name">NAME</option>
          </select>
        </div>
        <div>
          <select value={this.props.destinationEnvironment} onChange={ this.onStatusChange.bind(this, 'destination') } className="dropdown">
            <option value="" className="label">Destination Environment</option>
            <option value="devl">DEVL</option>
            <option value="intg">INTG</option>
            <option value="prod">PROD</option>
            <option value="name">NAME</option>
          </select>
        </div>
      </div>
    );
  }
});

// # export for use elsewhere
module.exports = Options;
