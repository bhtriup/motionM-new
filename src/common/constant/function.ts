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

export { converProfileImage, getOffset };
