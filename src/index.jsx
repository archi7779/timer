import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.sass';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import Timer from './components/timer';
import Countdown from './components/countdown';

import * as serviceWorker from './serviceWorker';

const { TabPane } = Tabs;

const vDom = (
  <Tabs defaultActiveKey="1" className="wrapper">
    <TabPane tab="Timer" key="1">
      <Timer />
    </TabPane>
    <TabPane tab="CountDown" key="2">
      <Countdown />
    </TabPane>
  </Tabs>
);

ReactDOM.render(vDom, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
