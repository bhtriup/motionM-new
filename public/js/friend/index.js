let userClass;
let friendClass;

const userInfo = getUserInfo();

$(() => {
  userClass = new User(userInfo);
  friendClass = new Friend(userInfo);

  getUserData();

  // 소켓 파일 호출
  loadJS('/js/socket/friend/friend.event.js');
});

/**
 * 친구 검색
 */
function searchFriend(el) {
  let data = $(el).val();
  friendClass.searchFriend(data);
}

async function getUserData() {
  // 로그인 유저 정보 가져오기
  await userClass.getUserDetailInfo();

  // 친구 목록
  await friendClass.getFriendList();

  // 로그인 처리
  setOnline(userInfo.userId);
}

function logout() {
  setOffline(userInfo.userId);

  location.href = FRONT_URL + '/login';
}
