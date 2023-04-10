chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.fn) {
    case 'localStorageCreate':
      window.localStorage.setItem(request.args.name, request.args.value);
      sendResponse({
        msg: `${request.args.name}:${window.localStorage.getItem(
          request.args.name
        )}`,
      });
      break;
    case 'localStorageEdit':
      window.localStorage.setItem(request.args.name, request.args.value);
      sendResponse({
        msg: `${request.args.name}:${window.localStorage.getItem(
          request.args.name
        )}`,
      });
      break;
    case 'localStorageRemove':
      window.localStorage.removeItem(request.args.name);
      sendResponse({
        msg: `${request.args.name}:${window.localStorage.getItem(
          request.args.name
        )}`,
      });
      break;
    case 'localStorageGet':
      const keys = Object.keys(window.localStorage);
      const localStorageList = [];
      keys.forEach((o) => {
        localStorageList.push({
          name: o,
          value: window.localStorage.getItem(o),
          originValue: window.localStorage.getItem(o),
        });
      });
      sendResponse({
        localStorage: localStorageList,
      });
      break;
    case 'csdn':
      document.querySelectorAll('#article_content').forEach((o) => {
        o.style.height = 'auto';
      });
      document.querySelectorAll('.hide-article-box').forEach((o) => {
        o.style.display = 'none';
      });
      document.querySelectorAll('code').forEach((o) => {
        o.style.userSelect = 'text';
      });
      sendResponse({
        msg: 'set',
      });
      break;
    default:
      break;
  }
});
