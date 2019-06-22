import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-au';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import ZH_WORDS from './assets/i18n/zh.json';
import EN_WORDS from './assets/i18n/en.json';
import store from './Store.js';
import App from './App';
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './assets/css/common.css';

addLocaleData([...en, ...zh]);

const userLang = navigator.language || '';
const language = userLang.toLowerCase().substr(0, 2);
let localAntD;
let locale;
let messages;

if (language === 'zh') {
  locale = 'zh';
  messages = ZH_WORDS;
  moment.locale('zh-cn');
  localAntD = zh_CN;
} else if (language === 'en') {
  locale = 'en';
  messages = EN_WORDS;
  moment.locale('en-au');
  localAntD = en_US;
}

ReactDOM.render(
  <IntlProvider locale={locale} messages={messages}>
    <LocaleProvider locale={zh_CN}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </LocaleProvider>
  </IntlProvider>,
  document.getElementById('root')
);