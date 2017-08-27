/* eslint-disable */

import get from 'lodash-es/get'
import { Cookies } from 'react-cookie';
import Mitt from './mitt';

const cookie = new Cookies();

let isMeiqiaInit = false;
let isPanelInit = false;

(function (m, ei, q, i, a, j, s) {
  m[i] = m[i] || function () {
    (m[i].a = m[i].a || []).push(arguments)
  };
  j = ei.createElement(q),
    s = ei.getElementsByTagName(q)[0];
  j.async = true;
  j.charset = 'UTF-8';
  j.src = '//static.meiqia.com/dist/meiqia.js?_=t';
  s.parentNode.insertBefore(j, s);
})(window, document, 'script', '_MEIQIA');
_MEIQIA('entId', 21064);
_MEIQIA('withoutBtn');
_MEIQIA('getPanelVisibility', (visibility) => {
  // 初始化的时候，会调用以下，导致 invisible
  if (isMeiqiaInit && visibility === 'invisible') {
    if (isPanelInit) {
      Mitt.emit('meiqia', {
        type: 'conversation',
        result: 'end',
      });
    }
    isPanelInit = true;
  }
  // visible || invisible
  if (isMeiqiaInit && visibility === 'invisible') {
  }
});
_MEIQIA('manualInit');

//智课统计代码
(function (accessInit) {
  var a = document.createElement("script");
  a.src = "//media8.smartstudy.com/data/access.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(a, s);
  a.onload = accessInit;
})(accessInit);

function accessInit() {
  if (window.ssAccess) {
    window.ssAccess.setupCookie();
  }
  const cpsInfo = cookie.get('cpsInfo');
  window.clientID = get(cpsInfo, 'cookie_id') || 'zhantoefl';
  if (clientID) {
    // should be less than 32 bits
    clientID = window.clientID.replace(/-/g, '');
  }
  window._MEIQIA('clientId', clientID);
  window._MEIQIA('init');
  isMeiqiaInit = true;
};
