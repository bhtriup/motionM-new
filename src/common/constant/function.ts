/**
 * 이미지 Base64로 변경
 */
function converProfileImage(img) {
  const imgBase64 = Buffer.from(img).toString('base64');

  return imgBase64;
}

function getOffset(page, limit) {
  return page * limit - limit;
}

function getNow() {
  const today = new Date();
  let year = today.getFullYear(); // 년도
  let month = (today.getMonth() + 1).toString(); // 월
  let date = today.getDate().toString(); // 날짜

  month = month.padStart(2, '0');
  date = date.padStart(2, '0');

  let hours = today.getHours().toString().padStart(2, '0'); // 시
  let minutes = today.getMinutes().toString().padStart(2, '0'); // 분
  let seconds = today.getSeconds().toString().padStart(2, '0'); // 분

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}

export { converProfileImage, getOffset, getNow };
