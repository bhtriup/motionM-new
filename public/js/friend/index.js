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
