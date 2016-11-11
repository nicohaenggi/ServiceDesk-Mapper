var React = require('react');
var CopyToClipboard = require('react-copy-to-clipboard');

/*
description
customfield_13805
customfield_13302
customfield_13302
customfield_13302
customfield_13405
customfield_13405
customfield_13404
customfield_13614
customfield_13405
customfield_13301
customfield_13202
customfield_13203
customfield_13302
customfield_12312=CHE_SKILL_CSAP_BI_DELIVERY
customfield_12314=nicht relevant
customfield_12315=gar nicht
customfield_11931=CH00HIO
customfield_11601=CP00RDF
customfield_10826=#created -100h
duedate=#created +100h
timeoriginalestimate=900
timeestimate=900
*/

var CodeOutput = React.createClass({
  translateCode: function() {
    var {originEnvironment, destinationEnvironment, code} = this.props;
    this.props.customFields.forEach((customField) => {
      if(!!customField[originEnvironment] && !!customField[destinationEnvironment]) {
        var fieldRegex = new RegExp(customField[originEnvironment], 'g')
        code = code.replace(fieldRegex, customField[destinationEnvironment]);
      }
    });
    return code;
  },
  findMissingFields: function() {
    var {originEnvironment, destinationEnvironment, code} = this.props;
    this.props.customFields.forEach((customField) => {
      if(!!customField[originEnvironment] && !!customField[destinationEnvironment]) {
        var fieldRegex = new RegExp(customField[originEnvironment], 'g')
        code = code.replace(fieldRegex, "");
      }
    });
    var re = /(customfield_\d{5})/g;
    var results = new Array();
    var result = re.exec(code)
    while (result){
      results.push(result[1]);
      result = re.exec(code);
    }
    return Array.from(new Set(results));;
  },
  render: function () {
    var {originEnvironment, destinationEnvironment, code} = this.props;
    var mappedCode = this.translateCode();
    var missingFields = this.findMissingFields();

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

    var renderOutput = () => {
      if(!originEnvironment || !destinationEnvironment) {
        return (
          <div className="block warning">
            please select an origin and destination environment first
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

module.exports = CodeOutput;
