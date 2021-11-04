import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import AcList from '../pages/AcList/index';
import Detail from '../pages/Detail/index';


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={AcList}/>
            <Route exact path="/detail/:id" component={Detail}/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;