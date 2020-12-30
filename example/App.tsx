import React from 'react';
import {Link, Route, BrowserRouter, Switch} from 'react-router-dom';
import {Main} from './Main';
import {Page} from './Page';
import {PageChild} from './PageChild';

export function App() {
  return (
    <>
      <BrowserRouter>
        <div id="App">
          <Link to="/">Main</Link> / <Link to="/page">Page</Link> /{' '}
          <Link to="/page/child">Page Child</Link>
          <hr />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/page" component={Page} />
            <Route exact path="/page/child" component={PageChild} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}
