var React = require('react');

var CodeTextBox = React.createClass({
  /** ## code input changed
  * called when the code input was updated, deleted or removed
  *
  * @param {event} e event
  */
  onCodeChange(e) {
    this.props.onCodeChange(e.target.value);
  },
  /** ## render function
  *
  * called whenever react renders the component; e.g. when props are updated
  */
  render() {
    return (
      <div className="small-12 code-text-box">
        <h4>Code Editor</h4>
        <textarea value={this.props.code} onChange={this.onCodeChange} placeholder="input your automation rule code here..."></textarea>
      </div>
    );
  }
});

// # export for use elsewhere
module.exports = CodeTextBox;
