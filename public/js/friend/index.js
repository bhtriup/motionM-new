let userClass;
let friendClass;

$(() => {
  userClass = new User();
  friendClass = new Friend();

  // 로그인 유저 정보 가져오기
  userClass.getUserDetailInfo();

  // 친구 목록
  friendClass.getFriendList();
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
