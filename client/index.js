import React from 'react';
import ReactDom from 'react-dom';
import App from './src/components/App.jsx';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

ReactDom.render(<Router><Route path="/listing/:id" component={App}/></Router>, document.getElementById('Photo-Gallery'));
// ReactDom.render(<App/>, document.getElementById('Photo-Gallery'));
