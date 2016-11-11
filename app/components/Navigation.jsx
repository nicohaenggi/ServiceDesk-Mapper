var React = require('react');

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
          <li className="menu-text">created by <a href="http://nicohaenggi.com" target="_blank">Nico Hänggi</a></li>
        </ul>
      </div>
    </div>
  );
};

module.exports = Navigation;
