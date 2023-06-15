/**
 * 로그인 정보 가져오기
 */
function getUserInfo() {
  let _data = localStorage.getItem('user-info');
  let _user = JSON.parse(_data);

  if (!_user) location.href = FRONT_URL + '/login';

  return _user.user;
}
