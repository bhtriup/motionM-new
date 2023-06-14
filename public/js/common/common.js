function getHeader(ykiho, type, token) {
  const headerObj = {
    'x-ykiho': ykiho,
  };

  if (type) {
    headerObj['x-type'] = type;
  }

  if (token) {
    headerObj.Authorization = 'Bearer ' + token;
  }

  return headerObj;
}
