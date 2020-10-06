import React from 'react';
import {render} from 'react-dom';
import {App} from './App';
import '../src/styles/index.scss';

render(React.createElement(App), document.getElementById('app'));
