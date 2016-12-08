// # navigation component
// navigation component displaying the nav

// ## import dependencies
var React = require('react');

/** ## navigation component
* this component consists only of a render function, thus containing no logic
*
* @param {Object} props the props passed on by the parent component
*/
var Navigation = (props) => {
  return(
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">Helvetia Insurance</li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">
          <li className="menu-text">ServiceDesk Mapper</li>
        </ul>
      </div>
    </div>
  );
};

// ## export for use elsewhere
module.exports = Navigation;
