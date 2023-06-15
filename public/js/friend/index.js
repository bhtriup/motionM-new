let userClass;
let friendClass;

const userInfo = getUserInfo();

$(() => {
  userClass = new User(userInfo);
  friendClass = new Friend(userInfo);

  // 로그인 유저 정보 가져오기
  userClass.getUserDetailInfo();

  // 친구 목록
  friendClass.getFriendList();

  loadJS('/js/socket/friend.socket.js');
});

/**
 * 친구 검색
 */
function searchFriend(el) {
  let data = $(el).val();
  friendClass.searchFriend(data);
}

/**
 * 로그인 처리
 */
function friendLogin() {
  friendClass.getFriendList();
}

/**
 * 로그아웃 처리
 */
function logout() {
  userClass.logout();
}

function chatUser(idx) {
  // console.log(idx);
  // location.href =
}
