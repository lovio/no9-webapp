import { inIOS, inAndroid } from './ua';

if (inIOS) {
  window.addEventListener('pagehide', () => {
    document.body.innerHTML = '';
    // wait for this callback to finish executing and then...
    setTimeout(() => {
      document.body.innerHTML = "<script type='text/javascript'>window.location.reload();</script>";
    });
  });
}

if (inAndroid) {
  window.addEventListener('pageshow', (e) => {
    setTimeout(() => {
      if (e.persisted) {
        window.location.reload(true);
      }
    });
  });
}
