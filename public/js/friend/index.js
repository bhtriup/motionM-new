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

  // 소켓 파일 호출
  loadJS('/js/socket/friend/friend.socket.js');
  loadJS('/js/socket/friend/friend.event.js');
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
