import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.sass'
import 'antd/dist/antd.css'
import Timer from './components/timer';
import CountDown from  './components/countdown'

import * as serviceWorker from './serviceWorker';



const vDom = (<><Timer /> <hr /> <CountDown /> </>);


ReactDOM.render(vDom, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
