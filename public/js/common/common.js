function getHeader(ykiho, type, token) {
  const headerObj = {
    'x-ykiho': ykiho,
  };

  if (type) headerObj['x-type'] = type;
  else headerObj['x-type'] = '0';

  if (token) {
    headerObj.Authorization = 'Bearer ' + token;
  }

  return headerObj;
}

/**
 * 자바스크립트 동적 로드
 * @param FILE_URL
 * @param async
 */
function loadJS(FILE_URL, async = true) {
  let scriptEle = document.createElement('script');

  scriptEle.setAttribute('src', FILE_URL);
  scriptEle.setAttribute('type', 'text/javascript');
  scriptEle.setAttribute('async', async);

  document.body.appendChild(scriptEle);
}
