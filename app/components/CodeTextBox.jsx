var React = require('react');

var CodeTextBox = React.createClass({
  onCodeChange(e) {
    this.props.onCodeChange(e.target.value);
  },
  render() {
    return (
      <div className="small-12 code-text-box">
        <h4>Code Editor</h4>
        <textarea value={this.props.code} onChange={this.onCodeChange} placeholder="input your automation rule code here..."></textarea>
      </div>
    );
  }
});

module.exports = CodeTextBox;
