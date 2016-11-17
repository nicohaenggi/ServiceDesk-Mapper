var React = require('react');
var CopyToClipboard = require('react-copy-to-clipboard');

var CodeOutput = React.createClass({
  /** ## code mapping
  *
  * translates the code from the origin environment to the selected
  * destination environment using the mapping file
  */
  translateCode: function() {
    var {originEnvironment, destinationEnvironment, code, customFields} = this.props;
    var mappedCode = code.replace(/((^.*)=|^(.+)$|%%(.*?)%%|#(.*?)\s)/gm, (match, m1, m2, m3, m4, m5) => {
      var matchedString = m2 || m3 || m4 || m5 || m6;
      match = match.replace(matchedString, () => {
        var replaceString = matchedString;
        customFields.forEach((field) => {
          if(field[originEnvironment] === matchedString && !!field[destinationEnvironment]) {
            replaceString = field[destinationEnvironment];
          }
        });
        return replaceString;
      });
      return match;
    });
    return mappedCode;
  },
  /** ## missing fields
  *
  * finds all the fields that either have no associated value in the csv
  * or are not even present in the csv file
  */
  findMissingFields: function() {
    var {originEnvironment, destinationEnvironment, code, customFields} = this.props;
    var results = [];
    var mappedCode = code.replace(/((^.*)=|^(.+)$|%%(.*?)%%|#(.*?)\s)/gm, (match, m1, m2, m3, m4, m5) => {
      var matchedString = m2 || m3 || m4 || m5 || m6;
      var replaced = false;
      customFields.forEach((field) => {
        if(field[originEnvironment] === matchedString && !!field[destinationEnvironment]) {
          replaced = true;
        }
      });
      if (!replaced) results.push(matchedString);
    });
    return Array.from(new Set(results));
  },
  /** ## render function
  *
  * called whenever react renders the component; e.g. when props are updated
  */
  render: function () {
    var {originEnvironment, destinationEnvironment, code} = this.props;
    var mappedCode = this.translateCode();
    var missingFields = this.findMissingFields();

    /** ## missing fields
    *
    * renders all the missing fields, that couldn't be found in the mapping-file (.csv)
    */
    var renderMissingFields = () => {
      if (missingFields.length > 0) {
        return (
          <div className="block info fields">
            <span>The following custom field id's couldn't be mapped:</span>
            <ul>
              {missingFields.map(function(value){
                return <li key={value}>{value}</li>;
              })}
            </ul>
          </div>
        );
      }
    }

    /** ## render output
    *
    * renders the output
    */
    var renderOutput = () => {
      if(!originEnvironment || !destinationEnvironment) {
        return (
          <div className="block warning">
            please select an origin and destination environment first
          </div>
        );
      } else if(originEnvironment === destinationEnvironment){
        return (
          <div className="block warning">
            please select a different origin and destination environment first
          </div>
        );
      } else if(!!mappedCode){
        return (
          <div>
            {renderMissingFields()}
            <div className="block">
              {mappedCode}
            </div>
            <CopyToClipboard text={mappedCode} onCopy={() => console.log("copied to clipboard...") }>
                <a href="#" className="clipboard small-12">Copy to Clipboard</a>
            </CopyToClipboard>
          </div>
        );
      } else {
        return (
          <div className="block info">
              no automation rule to translate
          </div>
        );
      }
    };

    return (
      <div className="small-12 code-output">
        <h4>Output</h4>
        {renderOutput()}
      </div>
    );
  }
});

// # export for use elsewhere
module.exports = CodeOutput;
