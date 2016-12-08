// # application bootup
// core component of the application; responsible for the application bootup

// # import dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');

// ## load scss
require('style!css!sass!applicationStyles');

// ## render main app component
ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={Main}></Route>
    </Router>,
    document.getElementById('app')
);
