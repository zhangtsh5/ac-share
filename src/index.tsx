import React from 'react';
import ReactDOM from 'react-dom';
import 'lib-flexible';
import './index.css';
// import App from './App';
// import AcList from './pages/AcList/index';
// import Detail from './pages/Detail/index';
// import TopBar from './components/TopBar/index';
import Router from './routers/index'




ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
