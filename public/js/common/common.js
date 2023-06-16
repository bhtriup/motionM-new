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

/**
 * 문자열 치환
 * @param {*} str 문자열
 * @param {*} searchStr 찾을문자 또는 정규식
 * @param {*} replaceStr 바꿀문자
 * @returns
 */
function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}

function getDateTime(datetime, type) {
  let dateTimeStr = '';
  switch (type) {
    case 'date':
      dateTimeStr = selectDate(datetime);
      break;
    case 'time':
      dateTimeStr = getTime(datetime);
      break;
  }

  return dateTimeStr;
}

function getDateFormat(dateStr) {
  var _dateStr = replaceAll(dateStr, /-/gi, '');

  var year = _dateStr.slice(0, 4);
  var month = _dateStr.slice(4, 6);
  var day = _dateStr.slice(6, 8);

  return `${year}-${month}-${day}`;
}

function selectDate(d) {
  var today = new Date(d);
  var year = today.getFullYear(); // 년도
  var month = today.getMonth() + 1; // 월
  var date = today.getDate(); // 날짜

  month = month.toString().padStart(2, '0');
  date = date.toString().padStart(2, '0');

  return `${year}-${month}-${date}`;
}

function getTime(d) {
  let localTime = new Date(d);
  let koreaTime = localTime.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
  });

  let lastIndex = koreaTime.lastIndexOf('.');
  let dateTimeStr = koreaTime.slice(lastIndex * -1).trim();

  return dateTimeStr;
}

function getToday() {
  var today = new Date();
  var year = today.getFullYear(); // 년도
  var month = today.getMonth() + 1; // 월
  var date = today.getDate(); // 날짜

  month = month.toString().padStart(2, '0');
  date = date.toString().padStart(2, '0');

  return `${year}-${month}-${date}`;
}
